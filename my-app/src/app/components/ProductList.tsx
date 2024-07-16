"use client";
import { IProduct } from "../../../types/products";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { getAllProduct, deleteProduct } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";

interface ProductProps {
  products: IProduct[];
}

const ITEMS_PER_PAGE = 10;

const ProductList: React.FC<ProductProps> = ({ products }) => {
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Ảnh</th>
            <th>STT</th>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((product) => (
            <Product product={product} key={product.id}></Product>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn"
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
