import { useEffect, useState } from "react";
import { getAllTodos } from "../../api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { ITask } from "../../types/tasks";
import Task from "./components/Task";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-col gap-4 my-5 text-center">
        <h1 className="text-2xl font-bold">CRUD App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
