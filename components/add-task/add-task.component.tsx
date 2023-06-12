import React, { useState } from "react";
import { nanoid } from "nanoid";

import TasksListStore from "../../store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "../../store/tasks-list/tasks-status.store";

const AddTask = () => {
  const [title, setTitle] = useState("");

  const handleResetInputField = () => {
    setTitle("");
  };

  const handleAddTask = () => {
    if (!title) return;

    const createdAt =
      new Date().toLocaleTimeString().slice(0, 4) +
      new Date().toLocaleTimeString().slice(7, 11);
    const id = nanoid();
    const status = TASK_STATUS.INPROGRESS;

    const task = {
      id: id,
      title: title,
      createdAt: createdAt,
      status: status,
      isDragging: false,
    };

    TasksListStore.addTask(task);
    TasksListStore.tasksList.map((task) => console.log(task));

    handleResetInputField();
  };

  return (
    <footer className="flex items-center gap-10 w-full h-20 px-10 mt-10 fixed bottom-0 bg-gray-950 shadow-2xl shadow-white ">
      <input
        type="text"
        placeholder="Add a task"
        className="block w-5/6 h-10 rounded-md border border-gray-800 outline-none px-4 bg-gray-900 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleAddTask()}
      />
      <button
        type="button"
        className="block w-1/6 h-10 bg-blue-600 text-white semibold rounded-md px-4"
        onClick={() => handleAddTask()}
      >
        Add Task
      </button>
    </footer>
  );
};

export default AddTask;
