import { Body, Controller, Post, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  addBoard(@Body('name') boardName: string): any {
    const boardId = this.boardsService.addBoard(boardName);
    return { id: boardId };
  }

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }
}
