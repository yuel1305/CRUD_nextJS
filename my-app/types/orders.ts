import { IProduct } from "./products";
export interface IOrder {
  orderModel: {
    id: number;
    name: string;
    address: string;
    phone: string;
  };
  //   orderProducts: [
  //     {
  //       orderId: number;
  //       productId: number;
  //     }
  //   ];
  productIds: number[];
}
