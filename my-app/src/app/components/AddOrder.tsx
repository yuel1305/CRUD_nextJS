"use client";

import React, { FormEventHandler, useCallback, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";
import { addOrder } from "../../../api";
import { useRouter } from "next/navigation";
import { IProduct } from "../../../types/products";
import { getAllProduct } from "../../../api";
import { useQuery } from "@tanstack/react-query";

const AddOrder = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>();

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const productsData: IProduct[] = await getAllProduct();
      // setProduct(productsData);
      // console.log(product);
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const { data } = useQuery({ queryKey: ["product"], queryFn: fetchProducts });
  // console.log("data", data);
  // console.log("type", typeof data);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
    // console.log(selectedProduct);
  };

  const findID = (name: string) => {
    if (data != null) {
      const product = data.find((item) => item.name === name);

      return product;
    }
  };
  // console.log("test", findID("vở")?.id);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addOrder({
      id: 0,
      product_id: selectedProduct,
      name: name,
      address: address,
      phone: phone,
    });
    setSelectedProduct("");
    setName("");
    setAddress("");
    setPhone("");
    setModalOpen(false);
    router.refresh();
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
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold">Add new Order</h3>
          <div className="modal-action">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="w-full input input-bordered"
            />
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

            <label className="w-full max-w-xs form-control">
              {data && (
                <select
                  className="select select-bordered"
                  onChange={handleChange}
                  value={selectedProduct}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {data &&
                    data.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                </select>
              )}
            </label>

            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddOrder;
