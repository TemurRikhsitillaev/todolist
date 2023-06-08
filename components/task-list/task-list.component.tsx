import React, { Fragment } from "react";
import Image from "next/image";

import TasksListStore from "@/store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "@/store/tasks-list/tasks-status.store";

import deleteIcon from "@/assets/delete-icon.svg";
import tickIcon from "@/assets/tick-icon.svg";

type TaskTypes = {
  id: string;
  title: string;
  createdAt: string;
  status: string;
};

const TaskList = ({ id, title, createdAt, status }: TaskTypes) => {
  const handleDeleteTask = (id: string) => {
    TasksListStore.deleteTask(id);
  };

  const handleCompleteTask = (id: string) => {
    TasksListStore.completeTask(id);
  };

  return (
    <section className="flex items-start text-white mb-8" key={id}>
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-gray-900 mr-5 flex justify-center items-center mt-4"
        onClick={() => handleCompleteTask(id)}
      >
        {status === TASK_STATUS.INPROGRESS && (
          <span className="block w-5 h-5 bg-gray-800 rounded-full"></span>
        )}
        {status === TASK_STATUS.DONE && (
          <span className="block w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
            <Image src={tickIcon} alt="tick" className="w-3 h-3" />
          </span>
        )}
      </button>
      <p
        className={`block text-left w-11/12 h-max-content bg-gray-900 mr-10 p-5 rounded-md overflow-auto break-words relative ${
          status === TASK_STATUS.DONE && "line-through text-gray-400"
        }`}
      >
        {title}
        <span className="w-15 h-5 flex justify-center items-center text-xs absolute bottom-1 right-2">
          {createdAt}
        </span>
      </p>
      <button
        type="button"
        onClick={() => handleDeleteTask(id)}
        className="w-10 h-10 bg-red-600 mt-3 rounded-md flex justify-center items-center border border-red-700"
      >
        <Image src={deleteIcon} alt="delete" className="w-6 h-6" />
      </button>
    </section>
  );
};

export default TaskList;
