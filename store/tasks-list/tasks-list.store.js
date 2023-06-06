import { makeAutoObservable, runInAction } from "mobx";

import { TASK_STATUS } from "./tasks-status.store";

class TasksListStore {
  tasksList = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasksList = async () => {
    this.isLoading = true;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      runInAction(() => {
        this.tasksList = data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addTask = (task) => {
    this.tasksList.push(task);
  };
  deleteTask = (id) => {
    this.tasksList = this.tasksList.filter((task) => task.id !== id);
  };

  completeTask = (id) => {
    this.tasksList = this.tasksList.map((task) => {
      if (task.id === id) {
        task.status = TASK_STATUS.DONE;
      }
      return task;
    });
  };
}

export default new TasksListStore();
