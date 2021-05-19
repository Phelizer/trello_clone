import { Body, Controller, Headers, Post } from '@nestjs/common';
import { getUserIDFromToken } from '../auth/JWTdecode';
import { TeamsService } from './teams.service';

@Controller('team')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post()
  async addTeam(
    @Body('name') teamName: string,
    @Headers('authorization') BearerToken: string,
  ) {
    const user_id = getUserIDFromToken(BearerToken);
    const teams = await this.teamsService.addBoard(teamName, user_id);
    return teams;
  }
}
