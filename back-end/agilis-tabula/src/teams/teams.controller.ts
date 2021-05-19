import { Body, Controller, Delete, Headers, Param, Post } from '@nestjs/common';
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

  @Delete(':teamID')
  async deleteTeam(
    @Param() idObj: { teamID: string },
    @Headers('authorization') BearerToken: string,
  ) {
    const user_id = getUserIDFromToken(BearerToken);
    const teamID = parseInt(idObj.teamID);

    return this.teamsService.removeTeam(teamID, user_id);
  }
}
