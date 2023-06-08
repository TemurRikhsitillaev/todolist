import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";

import TaskList from "../task-list/task-list.component";
import TasksListStore from "@/store/tasks-list/tasks-list.store";
import { TASK_STATUS } from "@/store/tasks-list/tasks-status.store";

const TasksList = observer(() => {
  const completedTasks = TasksListStore.tasksList.filter(
    (task) => task.status === TASK_STATUS.DONE
  );

  return (
    <main className="flex flex-col justify-center w-full h-full px-10 text-white">
      {/* ALL TASKS (TODO) */}
      <header className="px-10 mb-10">
        <h1 className="text-white text-3xl bold">To Do</h1>
      </header>
      {TasksListStore.tasksList.map((task) => {
        return <TaskList {...task} />;
      })}

      {/* COMPLETED TASKS */}
      {completedTasks.length > 0 && (
        <Fragment>
          <header className="px-10 mb-10  border-t border-gray-700">
            <h1 className="text-white text-3xl bold pt-5">Completed</h1>
          </header>
          {completedTasks.map((task) => {
            return <TaskList {...task} />;
          })}
        </Fragment>
      )}
    </main>
  );
});

export default TasksList;
