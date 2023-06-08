import React from "react";
import { observer } from "mobx-react-lite";

import TaskList from "../task-list/task-list.component";
import TasksListStore from "@/store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "@/store/tasks-list/tasks-status.store";
import { Empty } from "../empty/empty.component";

const TasksList = observer(() => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e);
    return e;
  };

  const inProgressTasks = TasksListStore.tasksList.filter(
    (task) => task.status === TASK_STATUS.INPROGRESS
  );

  const completedTasks = TasksListStore.tasksList.filter(
    (task) => task.status === TASK_STATUS.DONE
  );

  return (
    <main className="flex flex-col justify-start w-full h-[calc(100vh-80px)] p-10 text-white overflow-y-auto">
      {/* IN PROGRESS TASKS */}
      <header className="mb-10">
        <h1 className="text-white text-3xl bold">In Progress</h1>
      </header>
      {inProgressTasks.length > 0 ? (
        inProgressTasks.map((task) => {
          return <TaskList {...task} key={task.id} />;
        })
      ) : (
        <Empty />
      )}

      {/* COMPLETED TASKS */}
      {completedTasks.length > 0 && (
        <section
          onDragOver={handleDragOver}
          className=" mb-10 border-t border-gray-700"
        >
          <header className="mb-10">
            <h1 className="text-white text-3xl bold pt-5">Completed</h1>
          </header>
          {completedTasks.map((task) => {
            return <TaskList {...task} key={task.id} />;
          })}
        </section>
      )}
    </main>
  );
});

export default TasksList;
