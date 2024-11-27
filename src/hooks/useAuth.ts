
import { getUser, selectAuth, setToken } from '@/redux/slices/auth.slice'
import { login, loginUser } from '@/services/auth-service'
import { StoreLogin } from '@/types/entities/auth-entity'
import { useAppDispatch, useAppSelector } from '@/types/redux/redux'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoading } from './useLoading'

export function useAuth() {
  const [auth, setAuth] = useState(null)
  const { token } = useAppSelector(selectAuth)
  //   const { user } = useAppSelector((state) => state.user)
  const { isLoading, startLoading, stopLoading } = useLoading()

  const dispatch = useAppDispatch()
  const navigate = useRouter().push

  // Simulate authentication check on mount
  useEffect(() => {
    const checkAuthentication = () => {
      // Perform your authentication check here
      // Example: Check if the user is logged in from a persisted token or session

      // Simulating asynchronous authentication check
      setTimeout(() => {
        // If the user is authenticated, set the user object
        const isAuthenticated = /* Your authentication check logic */ true
        if (isAuthenticated) {
          //   setUser({
          //     /* User data */
          //   });
        }

        // setIsLoading(false);
      }, 1000)
    }

    checkAuthentication()
  }, [])
  useEffect(() => {
    if (token.access_token) {
      dispatch(getUser())
    }
  }, [token?.access_token])

  // Login function
  const onLogin = async <T>( paramLogin: StoreLogin, callbackSuccess?: (response?: T) => void) => {
    startLoading()
    try {
      const { username, password } = paramLogin

      const response = await login(
        {username,
        password}
      )
      //console.log("Data: ", response.data)
      if (response.data?.access_token) {
        dispatch(setToken(response.data))
      }

      toast.success('Đăng nhập thành công')
      callbackSuccess?.()
      navigate('/brand')
    } catch (err: any) {
      console.log(err)
      toast.error(err?.response?.data?.message || err?.message)
    } finally {
      stopLoading()
    }
  }

  // Logout function
  const logout = () => {
    // Perform your logout logic here
    // Example: Clear session, remove tokens, etc.

    return new Promise(() => {
      // Simulating asynchronous logout
      setTimeout(() => {
        setAuth(null)
        // resolve();
      }, 500)
    })
  }

  return {
    auth,
    isLoading,
    onLogin,
    logout
    // user
  }
}
