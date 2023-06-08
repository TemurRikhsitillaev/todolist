import React, { useRef } from "react";
import Image from "next/image";

import TasksListStore from "@/store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "@/store/tasks-list/tasks-status.store";

// IMAGES
import deleteIcon from "@/assets/delete-icon.svg";
import tickIcon from "@/assets/tick-icon.svg";

type TaskTypes = {
  id: string;
  title: string;
  createdAt: string;
  status: string;
};

const TaskList = ({ id, title, createdAt, status }: TaskTypes) => {
  const taskDragRefStart = useRef("");
  const taskDragOverRef = useRef("");

  const handleDeleteTask = (id: string) => {
    return TasksListStore.deleteTask(id);
  };

  const handleCompleteTask = (id: string) => {
    return TasksListStore.completeTask(id);
  };

  const handleUnCompleteTask = (id: string) => {
    return TasksListStore.unCompleteTask(id);
  };

  const handleCompleteUnCompleteTask = (id: string, status: string) => {
    if (status === TASK_STATUS.INPROGRESS) {
      return handleCompleteTask(id);
    } else if (status === TASK_STATUS.DONE) {
      return handleUnCompleteTask(id);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    taskDragRefStart.current = id;
    console.log("start", id);
    return e;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    taskDragOverRef.current = id;
    console.log("enter", id);
    return e;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    console.log("end: ", id);
    return e;
  };

  return (
    <div
      className={"flex items-start text-white mb-8"}
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnter={(e) => handleDragEnter(e, id)}
      onDragEnd={(e) => handleDragEnd(e, id)}
    >
      <button
        type="button"
        className="p-2 rounded-full bg-gray-900 mr-5 flex justify-center items-center mt-4"
        onClick={() => handleCompleteUnCompleteTask(id, status)}
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
    </div>
  );
};

export default TaskList;
