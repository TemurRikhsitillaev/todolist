import React from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import deleteIcon from "@/assets/delete-icon.svg";

import TasksListStore from "@/store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "@/store/tasks-list/tasks-status.store";

const TasksList = observer(() => {
  const handleDeleteTask = (id: string) => {
    TasksListStore.deleteTask(id);
  };

  const handleCompleteTask = (id: string) => {
    TasksListStore.completeTask(id);
  };

  return (
    <main className="flex flex-col justify-center gap-10 w-full h-full px-10 text-white">
      {TasksListStore.tasksList.map((task) => {
        return (
          <div className="flex items-start text-white" key={task.id}>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-gray-900 mr-5 flex justify-center items-center mt-4"
              onClick={() => handleCompleteTask(task.id)}
            >
              {task.status === TASK_STATUS.INPROGRESS && (
                <span className="block w-5 h-5 bg-gray-800 rounded-full"></span>
              )}
              {task.status === TASK_STATUS.DONE && (
                <span className="block w-5 h-5 bg-gray-400 rounded-full"></span>
              )}
            </button>
            <p className="block text-left w-11/12 h-max-content bg-gray-900 mr-10 p-5 rounded-md overflow-auto break-words relative ">
              {task.title}
              <span className="w-12 h-5 flex justify-center items-center text-xs absolute bottom-1 right-2">
                {task.createdAt}
              </span>
            </p>
            <button
              type="button"
              onClick={() => handleDeleteTask(task.id)}
              className="w-10 h-10 bg-red-600 mt-3 rounded-md flex justify-center items-center border border-red-700"
            >
              <Image src={deleteIcon} alt="delete" className="w-6 h-6" />
            </button>
          </div>
        );
      })}
    </main>
  );
});

export default TasksList;
