import { Body, Controller, Delete, Param, Post, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardID/:sectionID')
  async addTask(
    @Body('name') name: string,
    @Body('priority') priority: number,
    @Param() param: { boardID: string; sectionID: string },
  ) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);

    return await this.tasksService.addTask(name, boardID, sectionID, priority);
  }

  @Delete(':boardID/:taskID')
  removeTask(@Param() param: { boardID: string; taskID: string }) {
    const boardID = parseInt(param.boardID);
    const taskID = parseInt(param.taskID);

    return this.tasksService.removeTask(boardID, taskID);
  }

  @Patch(':boardID/:taskID')
  changeSection(
    @Param() param: { boardID: string; taskID: string },
    @Body('newSection') newSection: number,
  ) {
    const boardID = parseInt(param.boardID);
    const taskID = parseInt(param.taskID);

    return this.tasksService.changeSection(boardID, taskID, newSection);
  }
}
