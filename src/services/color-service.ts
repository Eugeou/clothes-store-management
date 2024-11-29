import axios from 'axios';
import envConfig from '@/configs/config';
import { Colors } from '@/types/entities/color-entity';
import { ParseJSON } from '@/configs/parseJSON';

const ColorUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color';
const accessToken = localStorage.getItem("accessToken");

// export const AddColors = async ({ ColorName, ColorCode}: CreatedColor): Promise<void> => {
    
//     if (!accessToken) {
//         throw new Error('No access token found');
//     }
    
//     const formData = new FormData();
//     formData.append('ColorName', ColorName);
//     formData.append('ColorCode', ColorCode);
    
//     const config = {
//         method: 'post',
//         url: ColorUrl,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${parseToken}`,
//         },
//         data: formData,
//         maxBodyLength: Infinity,
//     };

//     try {
//         const response = await axios.request(config);
//         console.log(JSON.stringify(response.data));
//     } catch (error) {
//         console.error("Add branch failed:", error);
//         throw error;
//     }
// }

// export const GetAllColors = async (): Promise<Colors[]> => {
    
//     if (!accessToken) {
//         throw new Error('No access token found');
//     }
    
//     const config = {
//         method: 'get',
//         url: ColorUrl,
//         headers: {
//             'Authorization': `Bearer ${parseToken}`,
//         },
//         maxBodyLength: Infinity,
//     };

//     try {
//         const response = await axios.request(config);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// export const DeleteColor = async (colorId: string): Promise<void> => {
    
//     if (!accessToken) {
//         throw new Error('No access token found');
//     }
    
//     const config = {
//         method: 'delete',
//         url: ColorUrl + '/' + colorId,
//         headers: {
//             'Authorization': `Bearer ${parseToken}`,
//         },
//         maxBodyLength: Infinity,
//     };

//     try {
//         const response = await axios.request(config);
//         console.log(JSON.stringify(response.data));
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// export const EditColor = async ({ Id, ColorName, ColorCode }: Colors): Promise<void> => {
    
//     if (!accessToken) {
//         throw new Error('No access token found');
//     }
    
//     const config = {
//         method: 'put',
//         url: ColorUrl + '/' + Id,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${parseToken}`,
//         },
//         data: JSON.stringify({ ColorName, ColorCode }),
//         maxBodyLength: Infinity,
//     };

//     try {
//         const response = await axios.request(config);
//         console.log(JSON.stringify(response.data));
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

export const AddColors = async (name: string): Promise<void> => {
    const config = {
        method: 'post',
        url: ColorUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        data: JSON.stringify({ name }),
        maxBodyLength: Infinity,
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const GetAllColor = async (): Promise<Colors[]> => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ColorUrl,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response = await axios.request<Colors[]>(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all color failed');
    }
}

export const DeleteColor = async (colorId: number): Promise<void> => {
    try {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: ColorUrl + '/' + colorId,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw new Error('Delete color failed');
    }
}

export const EditColor = async (id: number, name: string): Promise<void> => {
    try {
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: ColorUrl + '/' + id,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
            data: JSON.stringify({ name })
          };
        
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw new Error('Edit color failed');
    }
}
