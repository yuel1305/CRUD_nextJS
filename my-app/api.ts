import https from 'https';
import { IOrder } from "./types/orders"
import axios from 'axios';
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
        console.log('res', res.data.responseData);
        const todos = res.data.responseData;
        return todos;
    } catch (error) {
        console.error('Error fetching orders', error);
        throw error;
    }
};

export const addOrder = async (todo: any): Promise<any> => {
    const res = await axios.post(`${apiBaseUrl}/api/API/SaveOrder`,todo)
return res.data
}

export const editOrder = async (todo: any): Promise<any[]> => {
    const res = await axios.put(`${apiBaseUrl}/api/API/UpdateOrder`,todo)
return res.data
}

export const deleteOrder = async (id: number): Promise<void> => {
    await axios.delete(`${apiBaseUrl}/api/API/DeleteOrder/${id}`)
}

export const getAllProduct = async ():  Promise<IProduct[]> => {
    const res = await axios.get(`${apiBaseUrl}/api/API/GetProducts`)
    // console.log('res', res.data.responseData);
    const todos = res.data.responseData;
    return todos;
}

