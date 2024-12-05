import envConfig from "@/configs/config";
import axiosClient from "@/lib/axios";
import { CreateProductForm, Product } from "@/types/entities/product-entity";
import axios, { AxiosResponse } from "axios";

const ProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/products';
const accessToken = localStorage.getItem('access_token') || '';

// export const GetAllProducts = async () : Promise<Product[]> => {
//     const { data } = await axiosClient.get('/products');
//     return data;    
// }

export const DeleteProduct = async (productId: string) => {
    return await axiosClient.delete(envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${productId}`);
}

export const GetAllProducts = async (): Promise<Product[]> => {
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ProductUrl,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all products failed');
    }
}

export const AddProduct = async (data: CreateProductForm) => {
    const formData = new FormData();
    
    // Append productRequest fields
    formData.append('product_Name', data.productRequest.product_Name);
    formData.append('description', data.productRequest.description);
    formData.append('price', data.productRequest.price.toString());
    formData.append('category', data.productRequest.category);
    formData.append('branch', data.productRequest.branch);
  
    data.productRequest.productItemRequests.forEach((item, index) => {
      formData.append(`productItemRequests[${index}].size`, item.size.toString());
      formData.append(`productItemRequests[${index}].color`, item.color.toString());
    });
  
    // Append images
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }
  
    
    const response = await axios.post(ProductUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };

  export const GetDetailProduct = async (productId: string) => {
    const GetProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${productId}`;
    
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: GetProductUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
  
export const AddExistedProduct = async (id: string, sizeColorArray: { size: string, color: string }[]) => {
    const AddExistedProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${id}`;
   
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddExistedProductUrl,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            data: JSON.stringify(sizeColorArray),
        };
        await axios.request(config);
    } catch (error) {
        console.error(error);
    }
};
