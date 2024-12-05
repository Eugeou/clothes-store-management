import { ProductItem } from "./product-entity";

export interface ImportInvoice {
    createdAt: string;
    updatedAt: string;

    createdBy: string;
    updatedBy: string;

    id: string;
    total: number;
    
}

export interface ImportDetail {
    id: {
        importId: string;
        productItemId: string;
    };
    importInvoice: ImportInvoice;
    productItem: ProductItem[];
    quantity: number;
    price: number;
    total: number;
}



export interface ImportItemResponse {
    productItem: string;
    quantity: number;
    price: number;
    total: number;
}

export interface ImportDetailResponse {
    importResponse: {
        id: string;
        total: number;
    };
    importItemResponseList: ImportItemResponse[];
}

export interface AddImportItem {
    productItemId: string;
    quantity: number;
    price: number;
    total: number;
}
