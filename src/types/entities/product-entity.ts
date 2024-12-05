export type Product = {
    id: string;
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    image: string[];
}

export interface ProductRequest {
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    productItemRequests: ProductItemRequest[];
  }
  
export interface ProductItemRequest {
    size: number;
    color: number;
}
  
export interface CreateProductForm {
    productRequest: ProductRequest;
    images: FileList;
}


//Concrete product
export interface ProductItem {
    id: string;
    sizeName: string;
    colorName: string;
    quantity: number;
    price: number;
}