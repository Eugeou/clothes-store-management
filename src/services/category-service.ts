import axios, { AxiosError, AxiosResponse } from "axios";
import envConfig from "@/configs/config";
import { Category } from "@/types/entities/category-entity";
//import { ParseJSON } from "@/configs/parseJSON";
//import { toast } from "react-toastify";

const CategoryURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/category";
const accessToken = localStorage.getItem("accessToken");
// const parseToken = (accessToken) ? ParseJSON(accessToken) : null;

export const CreateCategory = async ({ name, productGender }: Category) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CategoryURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      data: JSON.stringify({ name, productGender })
    };
  
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create category');
    }
};

export const EditCategory = async ({ id, name, productGender }: Category): Promise<void> => {
    const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/category/${id}`;

    const config = {
      method: 'put',
      url: UpdateURL,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${accessToken}`,
      },
      data: JSON.stringify({ name, productGender }),
      maxBodyLength: Infinity
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      throw error; // throw the error to be caught in the calling function
    }
};

export const GetAllCategory = async (): Promise<Category[]> => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: CategoryURL,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Category[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Category failed');
    }
};
  