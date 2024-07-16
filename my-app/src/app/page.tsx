import { getAllOrder, getAllProduct } from "../../api";
import AddOrder from "./components/AddOrder";
import AddProduct from "./components/AddProduct";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";

export default async function Home() {
  const orders = await getAllOrder();
  const products = await getAllProduct();

  return (
    <main className="flex mt-4">
      <div className="flex flex-col w-full gap-4 my-5 text-center md:flex-row">
        <div className="md:w-1/3">
          <AddProduct />
          <ProductList products={products}></ProductList>
        </div>
        <div className="md:w-2/3">
          <AddOrder />
          {/* <OrderList orders={orders} /> */}
          <OrderList orders={orders}></OrderList>
        </div>
      </div>
    </main>
  );
}
