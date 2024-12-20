import envConfig from "@/configs/config";
import { ParseJSON } from "@/configs/parseJSON";
import { StoreLogin, StoreToken } from "@/types/entities/auth-entity";
import axios from "axios";

// const getAccessToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);
const accessToken = localStorage.getItem("accessToken")? localStorage.getItem("accessToken") : '';

// const parseToken = accessToken ? ParseJSON(accessToken) : null;

// export const loginUser = async (username: string, password: string) => {

//     const envLogin = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/login"
//     try {
//       const response = await fetch(envLogin, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });
//       if (!response.ok) {
//         throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error('Đã xảy ra lỗi khi đăng nhập');
//     }
// };

// export const login = async (bodyLogin: StoreLogin) => {
//     const { data } = await axios.post<{
//       data: any
//     }>(envConfig.NEXT_PUBLIC_API_ENDPOINT + '/auth/login', bodyLogin, {
//       baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT
//     })
//     return data
// }

export const login = async (bodyLogin: StoreLogin) => {
    const loginURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/login";
    try {
        const response = await axios.post(loginURL, bodyLogin);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Login failed');
    }
}

export const logout = async (): Promise<void> => {
  
    const LogOutURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/logout";
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: LogOutURL,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      throw new Error('Logout failed');
    }
};

export const GetMe = async ()=> {

    const GetMeUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/me";
    
    try {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GetMeUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        };
        const response = await axios.request(config);
        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}
  
export const refreshTokenService = async (refreshToken: string): Promise<{ access: string }> => {
  const { data } = await axios.post<{ access: string }>(
    envConfig.NEXT_PUBLIC_API_ENDPOINT + '/auth/refreshtoken',
    { refresh: refreshToken },
    {
      baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT
    }
  )
  return data
}

  

  