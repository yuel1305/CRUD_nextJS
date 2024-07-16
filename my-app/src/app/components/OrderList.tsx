"use client";
import { IProduct } from "../../../types/products";
import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { getAllProduct, deleteProduct } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";

import { IOrder } from "../../../types/orders";
import Order from "./Order";
interface OrderProps {
  orders: IOrder[];
}

const ITEMS_PER_PAGE = 10;

const OrderList: React.FC<OrderProps> = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedOrders, setSortedOrders] = useState(orders);
  const [sortOrderState, setSortOrderState] = useState<"asc" | "desc">("asc");

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = sortedOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setSortedOrders(orders);
  }, [orders]);

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

  const handleSort = () => {
    const sorted = [...sortedOrders].sort((a, b) => {
      const totalA = a.productIds.reduce((total, productId) => {
        const product = products?.find((p) => p.id === productId);
        return total + (product ? product.price : 0);
      }, 0);

      const totalB = b.productIds.reduce((total, productId) => {
        const product = products?.find((p) => p.id === productId);
        return total + (product ? product.price : 0);
      }, 0);

      return sortOrderState === "asc" ? totalA - totalB : totalB - totalA;
    });

    setSortedOrders(sorted);
    setSortOrderState(sortOrderState === "asc" ? "desc" : "asc");
  };

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
            <th>STT</th>
            <th>Sản phẩm</th>
            <th onClick={handleSort} className="cursor-pointer">
              Tổng tiền{" "}
              {sortOrderState === "asc" ? (
                <HiOutlineSortDescending
                  size={30}
                  style={{ display: "inline" }}
                />
              ) : (
                <HiOutlineSortAscending
                  size={30}
                  style={{ display: "inline" }}
                />
              )}
            </th>{" "}
            <th>Tên khách hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((order) => {
            // console.log("test", order);
            return <Order order={order} key={order.orderModel.id} />;
          })}
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

export default OrderList;
