import { getAllOrder } from "../../api";
import AddOrder from "./components/AddOrder";
import OrderList from "./components/OrderList";

export default async function Home() {
  const orders = await getAllOrder();

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-col gap-4 my-5 text-center">
        <h1 className="text-2xl font-bold">CRUD App</h1>
        <AddOrder />
      </div>
      <OrderList orders={orders} />
    </main>
  );
}
