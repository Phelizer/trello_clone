import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { pool } from '../dbPool';

@Injectable()
export class TasksService {
  boardsToTasks = {};

  async addTask(
    name: string,
    boardID: number,
    sectionID: number,
    priority: number,
  ): Promise<Task[]> {
    // generating timestamp
    const timestamp = new Date().getTime();

    await pool.query(
      'INSERT INTO tasks (task_name, section_id, priority, task_timestamp, board_id) VALUES ($1, $2, $3, $4, $5);',
      [name, sectionID, priority, timestamp, boardID],
    );

    const tasks = this.getAllTasks(boardID);

    return tasks;
  }

  async getAllTasks(boardID: number): Promise<Task[]> {
    const taskData = await pool.query(
      'SELECT task_id, task_name, section_id, priority, task_timestamp FROM tasks WHERE board_id = $1',
      [boardID],
    );
    const tasks = this.convertToTasks(taskData.rows);

    return tasks;
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

  convertToTasks(taskArr): Task[] {
    const tasks = taskArr.map(
      (task) =>
        new Task(
          task.task_name,
          task.task_id,
          task.section_id,
          task.priority,
          task.timestamp,
          [],
        ),
    );
    return tasks;
  }
}
