import { logout } from '@/redux/slices/auth.slice'
import { store } from '@/redux/store'
import { refreshTokenService } from '@/services/auth-service'
import envConfig from '@/configs/config'
//import { notifyError } from '@/utils/helpers/notify.helper'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'


const axiosClient = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
})

axiosClient.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        //const userId = localStorage.getItem('userId')
        if (refreshToken) {
          try {
            const { access } = await refreshTokenService(refreshToken)
            if (access) {
              localStorage.setItem('accessToken', access)
              axiosClient.defaults.headers.common['Authorization'] = `Bearer ${access}`
              originalRequest.headers['Authorization'] = `Bearer ${access}`
              return axiosClient(originalRequest)
            }
          } catch (error: any) {
            // Dispatch action để clear Redux (đăng xuất người dùng)
            store.dispatch(logout())
            toast.error(error?.response?.data?.message || 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!')
          }
        }
      } catch (error: any) {
        console.error(error)
        // notifyError(error?.response?.data?.message || 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!')
      }
      return new Promise((reject) => {
        reject(error)
      })
    } else {
      return Promise.reject(error)
    }
  }
)
export default axiosClient
