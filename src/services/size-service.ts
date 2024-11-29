import axios from 'axios';
import envConfig from '@/configs/config';


const SizeURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size';
const accessToken = localStorage.getItem('accessToken');

export const AddSize = async (data: string) => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SizeURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const GetAllSize = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: SizeURL,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};