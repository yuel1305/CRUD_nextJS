"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Modal from "./Modal";
import { addOrder } from "../../../api";
import { useRouter } from "next/navigation";
import { IProduct } from "../../../types/products";
import { getAllProduct } from "../../../api";
import { useQuery } from "@tanstack/react-query";

const AddOrder = () => {
  const fetchProducts = async () => {
    try {
      const productsData: IProduct[] = await getAllProduct();
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const { data } = useQuery({ queryKey: ["product"], queryFn: fetchProducts });

  useEffect(() => {
    if (data) {
      setQuantities(Array(data.length).fill(0));
    }
  }, [data]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [quantities, setQuantities] = useState<number[]>([]);

  const [orderIDs, setOrderIDs] = useState<number[]>([]); // State để lưu danh sách ID sản phẩm được chọn

  const updateQuantity = (productId: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[productId] = newQuantity;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (productId: number) => {
    if (quantities[productId] > 0) {
      updateQuantity(productId, quantities[productId] - 1);
    }
  };

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Thêm ID sản phẩm vào danh sách khi được chọn
      setOrderIDs([...orderIDs, productId]);
    } else {
      // Xóa ID sản phẩm khỏi danh sách khi không được chọn
      setOrderIDs(orderIDs.filter((id) => id !== productId));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        id: 0,
        name: name,
        address: address,
        phone: phone,
      };

      // Gọi API addOrder để thêm đơn hàng
      const response = await addOrder({
        orderModel: orderData,
        productIds: orderIDs,
      });

      console.log("Add Order Response:", response);

      // Xóa dữ liệu sau khi thêm đơn hàng thành công
      setSelectedProduct("");
      setName("");
      setAddress("");
      setPhone("");
      setModalOpen(false);
      setOrderIDs([]); // Xóa danh sách sản phẩm được chọn
      router.refresh(); // Cập nhật lại trang sau khi thêm đơn hàng
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full btn btn-primary"
      >
        Add new Order <FaPlus />{" "}
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 rounded-lg">
          <h3 className="text-lg font-bold">Add new Order</h3>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="w-full h-12 p-4 text-lg input input-bordered "
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Your Phone"
              className="w-full h-12 p-4 text-lg input input-bordered"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Your address"
              className="w-full h-12 p-4 text-lg input input-bordered"
            />

            {data && (
              <details className="w-full">
                <summary className="m-1 btn">Chọn sản phẩm</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                  {data.map((product, index) => (
                    <div className="items-center gap-3 " key={index}>
                      <li
                        className="d-flex "
                        style={{ width: "100%", flexDirection: "row" }}
                        key={index}
                      >
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => handleChange(e, product.id)}
                            checked={orderIDs.includes(product.id)}
                          />
                        </label>
                        <span>
                          <div className="w-12 h-12 avatar mask mask-squircle">
                            <img
                              src={`https://localhost:7114/${product.image}`}
                              alt={product.name}
                            />
                          </div>
                        </span>
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                        <span>Số lượng: {quantities[index]}</span>

                        <label>
                          <FaMinus
                            className="text-red-500 cursor-pointer"
                            onClick={() => decreaseQuantity(index)}
                          />
                          <span>{quantities[index]}</span>
                          <FaPlus
                            className="text-green-500 cursor-pointer"
                            onClick={() =>
                              updateQuantity(index, quantities[index] + 1)
                            }
                          />
                        </label>
                      </li>
                    </div>
                  ))}
                </ul>
              </details>
            )}

            <button
              type="submit"
              className="w-full h-12 text-lg btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddOrder;
