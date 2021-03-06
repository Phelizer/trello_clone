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
  async addSection(
    @Body('name') name: string,
    @Param() idObj: { boardID: string },
  ) {
    const boardID = parseInt(idObj.boardID);
    const sections = await this.sectionsService.addSection(name, boardID);
    return sections;
  }

  @Get(':boardID')
  async getAllSections(@Param() param: { boardID: string }) {
    const boardID = parseInt(param.boardID);

    const [sections, tasks] = await Promise.all([
      this.sectionsService.getAllSections(boardID),
      this.tasksService.getAllTasks(boardID),
    ]);

    return { sections: sections, tasks: tasks };
  }

  @Delete(':boardID/:sectionID')
  async removeSection(@Param() param: { boardID: string; sectionID: string }) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);
    return await this.sectionsService.removeSection(boardID, sectionID);
  }

  @Patch(':boardID/:sectionID')
  async changeSectionPosition(
    @Param() param: { boardID: string; sectionID: string },
    @Body('newPosition') newPos: number,
  ) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);
    return await this.sectionsService.changePosition(
      boardID,
      sectionID,
      newPos,
    );
  }
}
