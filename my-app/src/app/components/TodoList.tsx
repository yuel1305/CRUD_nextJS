import React from "react";
import { ITask } from "../../../types/tasks";
import Task from "../components/Task"

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return <Task key={task.id} task={task}></Task>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
