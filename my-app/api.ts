import https from "https";
import { IOrder } from "./types/orders";
import axios from "axios";
import { IProduct } from "./types/products";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Vô hiệu hóa việc kiểm tra chứng chỉ SSL
  }),
});

export const getAllOrder = async (): Promise<IOrder[]> => {
  try {
    const res = await axiosInstance.get(`${apiBaseUrl}/api/API/GetOrders`);
    console.log("res", res.data.responseData);
    const todos = res.data.responseData;
    return todos;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};

export const addOrder = async (todo: any): Promise<any> => {
  const res = await axios.post(`${apiBaseUrl}/api/API/SaveOrder`, todo);
  return res.data;
};

export const editOrder = async (todo: any): Promise<any[]> => {
  const res = await axios.put(`${apiBaseUrl}/api/API/UpdateOrder`, todo);
  return res.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`${apiBaseUrl}/api/API/DeleteOrder/${id}`);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${apiBaseUrl}/api/API/DeleteProduct/${id}`);
};

export const getAllProduct = async (): Promise<IProduct[]> => {
  try {
    const res = await axiosInstance.get(`${apiBaseUrl}/api/API/GetProducts`);
    // console.log("res", res.data.responseData);
    return res.data.responseData;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};

// export const addProduct = async (todo: any): Promise<any> => {
//     const res = await axios.post(`${apiBaseUrl}/api/API/SaveProduct`,todo)
// return res.data
// }

export const addProduct = async (formData: FormData): Promise<any> => {
  const res = await axios.post(`${apiBaseUrl}/api/API/AddImage`, formData);
  return res.data;
};

export const getProductById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${apiBaseUrl}/api/API/GetProductById/${id}`
    );
    return res.data.responseData;
    console.log("data", res.data.responseData);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
