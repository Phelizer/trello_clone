import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Header,
} from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // creating new board request handling
  @Post()
  addBoard(@Body('name') boardName: string): any {
    const boardId = this.boardsService.addBoard(boardName);
    return { id: boardId };
  }

  // retrieving all the boards request handling
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Credentials', 'true')
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
