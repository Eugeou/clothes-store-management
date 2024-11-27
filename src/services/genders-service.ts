import axios, { AxiosResponse } from "axios";
import envConfig from "@/configs/config";
import { Gender } from "@/types/entities/genders-entity";

const GenderUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/productGender";
const accessToken = localStorage.getItem("accessToken");

export const GetAllGender = async (): Promise<Gender[]> => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GenderUrl,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Gender[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Product Gender failed');
    }
};

export const EditPG = async (id: string, name: string) => {
    const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/productGender/${id}`;

    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: EditBranchUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            data: JSON.stringify({ name }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const AddPG = async (PGName: string) => {
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: GenderUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ name: PGName }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Add PG failed");
    }
};

export const DeletePG = async (id: string) => {
    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/productGender/${id}`;

    const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
    