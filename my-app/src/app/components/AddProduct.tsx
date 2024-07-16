"use client";

import React, { FormEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { addProduct } from "../../../api";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmitProduct: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", "0");
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("size", size.toString());
    formData.append("price", price.toString());

    if (image) {
      formData.append("image", image);
    }

    try {
      await addProduct(formData);
      setName("");
      setBrand("");
      setSize(0);
      setPrice(0);
      setImage(null);
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full btn btn-primary"
      >
        Add new Product <FaPlus />{" "}
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitProduct}>
          <h3 className="text-lg font-bold">Add new Product</h3>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name of product"
              className="w-full input input-bordered"
            />
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              placeholder="Brand"
              className="w-full input input-bordered"
            />
            <input
              onChange={(e) => setSize(parseInt(e.target.value))}
              type="text"
              placeholder="Size"
              className="w-full input input-bordered"
            />
            <input
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="text"
              placeholder="Price"
              className="w-full input input-bordered"
            />
            <input
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              type="file"
              accept="image/*"
              className="w-full input input-bordered"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddProduct;
