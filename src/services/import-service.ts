import axios from 'axios';
import envConfig from '@/configs/config';
import { AddImportItem, ImportInvoice } from '@/types/entities/import-entity';


const ImportUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';
const accessToken = localStorage.getItem('accessToken') || '';

export const AddNewImport = async (items: AddImportItem[]) => {
 
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ImportUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        data: items,
    };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
};

export const GetAllImport = async (): Promise<ImportInvoice[]> => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ImportUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const GetImportById = (id: string) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ImportUrl + `/${id}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        return axios.request(config);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
