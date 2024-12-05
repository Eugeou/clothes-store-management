import axios from 'axios';
import envConfig from '@/configs/config';

const accessToken = localStorage.getItem('accessToken') || '';
const UsersUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/users';

export const GetUserById = async (id: string) => {
    
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: UsersUrl + `/${id}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
}