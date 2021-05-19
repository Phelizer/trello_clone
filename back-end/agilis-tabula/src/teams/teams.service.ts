import { Injectable } from '@nestjs/common';
import { pool } from '../dbPool';

@Injectable()
export class TeamsService {
  async addBoard(teamName: string, userID: number) {
    const teamIDData = await pool.query(
      'INSERT INTO teams (team_name) VALUES ($1) RETURNING team_id',
      [teamName],
    );
    const teamID = teamIDData.rows[0].team_id;

    await pool.query(
      'INSERT INTO teams_users (team_id, user_id) VALUES ($1, $2)',
      [teamID, userID],
    );

    return this.getTeams(userID);
  }

  async getTeams(user_id: number): Promise<Array<any>> {
    const teamsData = await pool.query(
      'SELECT team_name, teams.team_id FROM teams_users LEFT JOIN teams ON teams_users.team_id = teams.team_id WHERE user_id = $1',
      [user_id],
    );
    const teams = teamsData.rows.map((team) => ({
      name: team.team_name,
      id: team.team_id,
    }));
    return teams;
  }
}
