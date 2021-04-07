import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // creating new board request handling
  @Post()
  addBoard(@Body('name') boardName: string) {
    const boards = this.boardsService.addBoard(boardName);
    return boards;
  }

  // retrieving all the boards request handling
  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  // deleting a board request handling
  @Delete(':id')
  removeBoard(@Param() idObj: { id: string }) {
    const id = parseInt(idObj.id);
    return this.boardsService.removeBoard(id);
  }
}
