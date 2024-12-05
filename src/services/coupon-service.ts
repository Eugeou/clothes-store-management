import axios from 'axios';

import envConfig from '@/configs/config';
import { Coupon, ExistedCoupon } from '@/types/entities/coupon-entity';
import axiosClient from '@/lib/axios';


const CouponURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/coupons';
const accessToken = localStorage.getItem('access_token');

export const AddCoupon = async (coupon: Coupon) => {

  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CouponURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      data: JSON.stringify(coupon),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add coupon');
  }

};

export const UpdateCoupon = async (id: string, coupon: ExistedCoupon) => {
  try {
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: CouponURL + '/couponId/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      data: JSON.stringify(coupon),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update coupon');
  }
}

export const GetAllCoupons = async () => {
    
  

  const config = {
      method: 'get',
      url: CouponURL,
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      }
  };
  try {
      const response = await axios.request<ExistedCoupon[]>(config);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}


// export const GetAllCoupons = async () : Promise<ExistedCoupon[]> => {
//     const { data } = await axiosClient.get("/coupons");
//     return data;
// }

export const GetDetailCoupon = async (id: string) => {
    const { data } = await axiosClient.get<ExistedCoupon>(envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${id}`);
    return data;
}

export const DeleteCoupon = async (id: string) => {
    return await axiosClient.delete(envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${id}`);
}