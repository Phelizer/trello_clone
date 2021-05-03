import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Headers,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { JwtDecode, getToken } from '../auth/JWTdecode';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // creating new board request handling
  @Post()
  async addBoard(
    @Body('name') boardName: string,
    @Body('team_id') team_id: number,
  ) {
    const boards = this.boardsService.addBoard(boardName, team_id);
    return boards;
  }

  // retrieving all the boards request handling
  @Get()
  async getAllBoards(@Headers('authorization') BearerToken: string) {
    const token = getToken(BearerToken);
    const decodedJWT = JwtDecode(token);
    const user_id = decodedJWT.sub;

    return await this.boardsService.getAllBoards(user_id);
  }

  // deleting a board request handling
  @Delete(':id')
  removeBoard(@Param() idObj: { id: string }) {
    const id = parseInt(idObj.id);
    return this.boardsService.removeBoard(id);
  }
}
