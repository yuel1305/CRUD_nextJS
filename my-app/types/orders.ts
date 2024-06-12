import { IProduct } from "./products";
export interface IOrder {
    id: number;
    product: IProduct;
    name: string;
    address: string;
    phone: string;
}