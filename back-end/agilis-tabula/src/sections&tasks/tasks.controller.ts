import { Body, Controller, Param, Post } from '@nestjs/common';
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
}
