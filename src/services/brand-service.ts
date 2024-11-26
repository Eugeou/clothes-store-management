import axios, { AxiosResponse } from "axios";
import envConfig from "@/configs/config";
import { Branch, CreatedBrand } from "@/types/entities/brand-entity";
import { ParseJSON } from "@/configs/parseJSON";

const BrandUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/branch";
const getAccessToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);
const accessToken = getAccessToken();
const parseToken = accessToken ? ParseJSON(accessToken) : null;

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

    // if (!accessToken) {
    //     throw new Error('No access token found');
    // }

    //const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BrandUrl,
            headers: {
              "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25sZTEwMjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MTYzNjMzOTYsImV4cCI6MTcxNjM2Njk5Nn0.afL_a4RB2S_6M2deie3hYRQLTprYBxMbAS-NQkNbQq',
            }
          };
        
          const response: AxiosResponse<Branch[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all brand failed');
    }
};

export const CreateBrand = async (branchName: string) => {
    
    // if (!accessToken) {
    //     throw new Error("No access token found");
    // }
    
    // const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: BrandUrl,
            headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25sZTEwMjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MTYzNjMzOTYsImV4cCI6MTcxNjM2Njk5Nn0.afL_a4RB2S_6M2deie3hYRQLTprYBxMbAS-NQkNbQq',
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

    // if (!accessToken) {
    //     throw new Error("No access token found");
    // }

    // const parseToken = ParseJSON(accessToken);

    const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25sZTEwMjAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MTYzNjMzOTYsImV4cCI6MTcxNjM2Njk5Nn0.afL_a4RB2S_6M2deie3hYRQLTprYBxMbAS-NQkNbQq',
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

    // if (!accessToken) {
    //     throw new Error("No access token found");
    // }

    // const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: EditBranchUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${parseToken}`,
            },
            data: JSON.stringify({ name }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


