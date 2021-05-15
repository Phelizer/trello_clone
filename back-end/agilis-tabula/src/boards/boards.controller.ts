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
import { getUserIDFromToken } from '../auth/JWTdecode';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // creating new board request handling
  @Post()
  async addBoard(
    @Body('name') boardName: string,
    @Body('team_id') team_id: number,
    @Headers('authorization') BearerToken: string,
  ) {
    const user_id = getUserIDFromToken(BearerToken);

    const boards = this.boardsService.addBoard(boardName, team_id, user_id);
    return await boards;
  }

  // retrieving all the boards request handling
  @Get()
  async getAllBoards(@Headers('authorization') BearerToken: string) {
    const user_id = getUserIDFromToken(BearerToken);

    const boardsPromise = this.boardsService.getBoardsOfUser(user_id);
    const teamsPromise = this.boardsService.getTeams(user_id);
    const [boards, teams] = await Promise.all([boardsPromise, teamsPromise]);

    return { boards, teams };
  }

  // deleting a board request handling
  @Delete(':id')
  async removeBoard(
    @Param() idObj: { id: string },
    @Headers('authorization') BearerToken: string,
  ) {
    const user_id = getUserIDFromToken(BearerToken);

    const id = parseInt(idObj.id);
    return await this.boardsService.removeBoard(id, user_id);
  }
}
