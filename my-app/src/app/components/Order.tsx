"use client";
import React, { FormEventHandler, useState } from "react";
import { IOrder } from "../../../types/orders";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editOrder, getAllProduct, deleteOrder } from "../../../api";
import { IProduct } from "../../../types/products";
import { useQuery } from "@tanstack/react-query";

interface OrderProps {
  order: IOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [name, setName] = useState<string>(order.orderModel.name);
  const [phone, setPhone] = useState<string>(order.orderModel.phone);
  const [address, setAddress] = useState<string>(order.orderModel.address);
  const [currentOrderId, setCurrentOrderId] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const productsData: IProduct[] = await getAllProduct();
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const { data: products } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
  });

  const orderProducts = products?.filter((product) =>
    order.productIds.includes(product.id)
  );

  const router = useRouter();

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editOrder(
      // id: currentOrderId,
      // address: address,
      // phone: phone,
      {
        orderModel: {
          id: currentOrderId,
          name: order.orderModel.name,
          address: address,
          phone: phone,
        },
        productIds: order.productIds,
      }
    );
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteOrder = async (id: number) => {
    await deleteOrder(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  const handleOpenEditModal = (id: number) => {
    setCurrentOrderId(id);
    setOpenModalEdit(true);
  };

  return (
    <tr key={order.orderModel.id}>
      <td>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </td>
      <td>{order.orderModel.id}</td>
      <td>{orderProducts?.map((product) => product.name).join(", ")}</td>
      <td>
        {orderProducts?.reduce((total, product) => total + product.price, 0)}
      </td>
      <td>{order.orderModel.name}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => {
            handleOpenEditModal(order.orderModel.id);
          }}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="text-lg font-bold">Edit order</h3>
            <div className="modal-action">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Your Phone"
                className="w-full input input-bordered"
              />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Your address"
                className="w-full input input-bordered"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">
            Are you sure you want to delete this order?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => {
                handleDeleteOrder(order.orderModel.id);
              }}
              className="btn"
            >
              YES
            </button>
            <button onClick={() => setOpenModalDelete(false)}>NO</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Order;
