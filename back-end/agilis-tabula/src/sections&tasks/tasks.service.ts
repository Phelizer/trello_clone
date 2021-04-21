import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  boardsToTasks = {};

  addTask(
    name: string,
    boardID: number,
    sectionID: number,
    priority: number,
  ): Task[] {
    // generating a pseudo id
    const id = Math.floor(Math.random() * (100000 - 0)) + 0;

    // generating timestamp
    const timestamp = new Date().getTime();

    // default initial value for executors array
    const executorIDArr = [];

    const task = new Task(
      name,
      id,
      sectionID,
      priority,
      timestamp,
      executorIDArr,
    );

    if (!this.boardsToTasks[boardID]) this.boardsToTasks[boardID] = [];
    this.boardsToTasks[boardID].push(task);

    return this.boardsToTasks[boardID];
  }

  getAllTasks(boardID: number): Task[] {
    const tasks = this.boardsToTasks[boardID];
    return tasks ? tasks : [];
  }

  removeTask(boardID: number, taskID: number): Task[] {
    // error handling
    if (!this.taskExists(boardID, taskID))
      throw new NotFoundException('Could not find task with such ID');

    this.boardsToTasks[boardID] = this.boardsToTasks[boardID].filter(
      (task) => task.id !== taskID,
    );

    return this.boardsToTasks[boardID];
  }

  changeSection(boardID: number, taskID: number, newSec: number): Task[] {
    // error handling
    if (!this.taskExists(boardID, taskID))
      throw new NotFoundException('Could not find task with such ID');

    const searchedTask = this.boardsToTasks[boardID].find(
      (task) => task.id === taskID,
    );

    searchedTask.section = newSec;
    return this.boardsToTasks[boardID];
  }

  // TO be done: changePriority

  // TO be done: assignExecutor

  // error handling utils

  // this function checks it there is a task in DB
  // with such id
  taskExists(boardID: number, taskID: number): boolean {
    if (!this.boardExists(boardID))
      throw new NotFoundException('Could not find board with such ID');

    const searchedTask = this.boardsToTasks[boardID].find(
      (task) => task.id === taskID,
    );
    return searchedTask ? true : false;
  }

  // this function checks it there is a board in DB
  // with such id
  boardExists(boardID: number): boolean {
    return this.boardsToTasks[boardID] ? true : false;
  }
}
