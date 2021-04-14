import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('board')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post(':boardID')
  addSection(@Body('name') name: string, @Param() idObj: { boardID: string }) {
    const boardID = parseInt(idObj.boardID);
    const sections = this.sectionsService.addSection(name, boardID);
    return sections;
  }

  @Get(':boardID')
  getAllSections(@Param() param: { boardID: string }) {
    const boardID = parseInt(param.boardID);
    return this.sectionsService.getAllSections(boardID);
  }

  @Delete(':boardID/:sectionID')
  removeSection(@Param() param: { boardID: string; sectionID: string }) {
    const boardID = parseInt(param.boardID);
    const sectionID = parseInt(param.sectionID);
    return this.sectionsService.removeSection(boardID, sectionID);
  }
}
