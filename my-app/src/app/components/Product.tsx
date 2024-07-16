"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { getAllProduct, deleteOrder, deleteProduct } from "../../../api";
import { IProduct } from "../../../types/products";
import { useQuery } from "@tanstack/react-query";

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const productsData: IProduct[] = await getAllProduct();
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const { data } = useQuery({ queryKey: ["product"], queryFn: fetchProducts });

  const router = useRouter();

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  //   const handleOpenEditModal = (id: number) => {
  //     setCurrentOrderId(id);
  //     setOpenModalEdit(true);
  //   };

  return (
    <tr key={product.id}>
      <td>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 h-12 mask mask-squircle">
              <img
                src={`https://localhost:7114/${product.image}`}
                alt={product.name}
              />
            </div>
          </div>
        </div>
      </td>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <FiTrash2
          onClick={() => {
            setCurrentProductId(product.id);
            setOpenModalDelete(true);
          }}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">
            Are you sure you want to delete this product?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => {
                handleDeleteProduct(currentProductId);
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

export default Product;
