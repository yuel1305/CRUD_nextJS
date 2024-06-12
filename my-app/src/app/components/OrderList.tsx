import React from "react";
import { IOrder } from "../../../types/orders";
import Order from "./Order";

interface OrderProps {
  orders: IOrder[];
}

const OrderList: React.FC<OrderProps> = ({ orders }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {orders.map((order) => {
              return <Order order={order} key={order.id}></Order>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
