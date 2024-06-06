import { ITask } from "./types/tasks"
import axios from 'axios';

const baseUrl = "http://localhost:3001"

export const getAllTodos = async ():  Promise<ITask[]> => {
    const res = await axios.get(`${baseUrl}/tasks`)
    const todos = res.data;
    return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask[]> => {
    const res = await axios.post(`${baseUrl}/tasks`,JSON.stringify(todo))
return res.data
}

export const editTodo = async (todo: ITask): Promise<ITask[]> => {
    const res = await axios.put(`${baseUrl}/tasks/${todo.id}`,JSON.stringify(todo))
return res.data
}

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/tasks/${id}`)
}