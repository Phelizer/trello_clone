import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { TasksService } from './tasks.service';

@Controller('board')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post(':boardID')
  addSection(@Body('name') name: string, @Param() idObj: { boardID: string }) {
    const boardID = parseInt(idObj.boardID);
    const sections = this.sectionsService.addSection(name, boardID);
    return sections;
  }

  @Get(':boardID')
  getAllSections(@Param() param: { boardID: string }) {
    const boardID = parseInt(param.boardID);
    const sections = this.sectionsService.getAllSections(boardID);
    const tasks = this.tasksService.getAllTasks(boardID);

    return { sections: sections, tasks: tasks };
  }

  @Delete(':boardID/:sectionID')
  removeSection(@Param() param: { boardID: string; sectionID: string }) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);
    return this.sectionsService.removeSection(boardID, sectionID);
  }

  @Patch(':boardID/:sectionID')
  changeSectionPosition(
    @Param() param: { boardID: string; sectionID: string },
    @Body('newPosition') newPos: number,
  ) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);
    return this.sectionsService.changePosition(boardID, sectionID, newPos);
  }
}
