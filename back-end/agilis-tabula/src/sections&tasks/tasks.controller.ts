import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardID/:sectionID')
  addTask(
    @Body('name') name: string,
    @Body('priority') priority: number,
    @Param() param: { boardID: string; sectionID: string },
  ) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);

    return this.tasksService.addTask(name, boardID, sectionID, priority);
  }

  @Delete(':boardID/:taskID')
  removeTask(@Param() param: { boardID: string; taskID: string }) {
    const boardID = parseInt(param.boardID);
    const taskID = parseInt(param.taskID);

    return this.tasksService.removeTask(boardID, taskID);
  }
}
