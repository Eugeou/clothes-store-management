import axios, { AxiosError, AxiosResponse } from "axios";
import envConfig from "@/configs/config";
import { Branch, CreatedBrand } from "@/types/entities/brand-entity";
import { ParseJSON } from "@/configs/parseJSON";
import { toast } from "react-toastify";

const BrandUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/branch";
const accessToken = localStorage.getItem("accessToken");
// const parseToken = (accessToken) ? ParseJSON(accessToken) : null;


// export const CreateBrand = async (brand: CreatedBrand) => {
    

//     if (!accessToken) {
//         throw new Error("No access token found");
//     }

//     const formData = new FormData();
//     formData.append("BrandName", brand.BrandName);
//     formData.append("Description", brand.Description);
//     formData.append("ImageSource", brand.ImageSource);

//     const config = {
//         method: "post",
//         url: BrandUrl,
//         headers: {
//             "Authorization": `Bearer ${ParseJSON(accessToken)}`,
//             "Content-Type": "multipart/form-data",
//         },
//         data: formData,
//     };

//     try {
//         const response = await axios(config);
//         return response.data;
//     } catch (error) {
//         console.error("Add branch failed:", error);
//         throw error;
//     }
// };

// export const GetAllBrand = async (): Promise<Brand[]> => {

//     if (!accessToken) {
//         throw new Error('No access token found');
//     }

//     const parseToken = ParseJSON(accessToken);
    
//     try {
//         const config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: BrandUrl,
//             headers: {
//               "Authorization": `Bearer ${parseToken}`,
//             }
//           };
        
//           const response: AxiosResponse<Brand[]> = await axios.request(config);
//           return response.data;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Get all branch failed');
//     }
// };

// export const DeleteBrand = async (id: string) => {

//     const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/brand/${id}`;

//     if (!accessToken) {
//         throw new Error("No access token found");
//     }

//     const parseToken = ParseJSON(accessToken);

//     const config = {
//         method: "delete",
//         maxBodyLength: Infinity,
//         url: DeleteURL,
//         headers: {
//             "Authorization": `Bearer ${parseToken}`,
//         },
//     };
//     try {
//         const response = await axios.request(config);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

// // export const EditBrand = async (id: string, brandName: string, description: string, image: string) => {

// //     const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/brand/${id}`;

// //     if (!accessToken) {
// //         throw new Error("No access token found");
// //     }

// //     const parseToken = ParseJSON(accessToken);

// //     try {
// //         const config = {
// //             method: "put",
// //             maxBodyLength: Infinity,
// //             url: EditBranchUrl,
// //             headers: {
// //                 "Content-Type": "application/json",
// //                 "Authorization": `Bearer ${parseToken}`,
// //             },
// //             data: JSON.stringify({ brandName, description, image }),
// //         };
// //         const response = await axios.request(config);
// //         return response.data;
// //     } catch (error) {
// //         console.error(error);
// //     }
// // };

// export const EditBrand = async ( id: string, brand: CreatedBrand) => {
//     const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/brand/${id}`;

//     if (!accessToken) {
//         throw new Error("No access token found");
//     }

//     const formData = new FormData();
//     formData.append("Name", brand.BrandName);
//     formData.append("Description", brand.Description);
//     formData.append("ImageSource", brand.ImageSource);

//     const config = {
//         method: "put",
//         url: EditBranchUrl,
//         headers: {
//             "Authorization": `Bearer ${ParseJSON(accessToken)}`,
//             "Content-Type": "multipart/form-data",
//         },
//         data: formData,
//     };

//     try {
//         const response = await axios(config);
//         return response.data;
//     } catch (error) {
//         console.error("Edit branch failed:", error);
//         throw error;
//     }
// };

export const GetAllBrand = async (): Promise<Branch[]> => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BrandUrl,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Branch[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        //console.error(error);
        //toast.warning(error.toString() || "Get all branch failed");
        throw new Error('Get all brand failed');
    }
};

export const CreateBrand = async (branchName: string) => {
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: BrandUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ name: branchName }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Add branch failed");
    }
      
};

export const DeleteBrand = async (id: string) => {

    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/branch/${id}`;

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

export const EditBrand = async (id: string, name: string) => {

    const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/branch/${id}`;
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


