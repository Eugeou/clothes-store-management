export interface Coupon {
    name: string;
    startDate: string;
    endDate: string;
    discountValue: number;
    minimumBill: number;
    quantity: number;
    status: number;
}

export type ExistedCoupon = {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    discountValue: number;
    minimumBill: number;
    quantity: number;
    eventStatus: string;
}
