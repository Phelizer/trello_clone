import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { ExtendedBoard } from './ExtendedBoard.model';
import { pool } from '../dbPool';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  async addBoard(
    name: string,
    team_id: number,
    user_id: number,
  ): Promise<Array<ExtendedBoard>> {
    if (!name) {
      throw new Error('Invalid name');
    }

    // inserting new board
    await pool.query(
      'INSERT INTO boards (board_name, team_id) VALUES ($1, $2);',
      [name, team_id],
    );

    const boards = await this.getBoardsOfUser(user_id);

    return boards;
  }

  // getting all boards of the user
  async getBoardsOfUser(user_id: number): Promise<Array<ExtendedBoard>> {
    const boards = await pool.query(
      'SELECT board_id, board_name, boards.team_id, team_name FROM teams_users LEFT JOIN boards ON teams_users.team_id = boards.team_id' +
        ' LEFT JOIN teams ON boards.team_id = teams.team_id WHERE user_id = $1;',
      [user_id],
    );

    const extBoards = this.convertToBoards(boards.rows);

    return extBoards;
  }

  async removeBoard(
    board_id: number,
    user_id: number,
  ): Promise<ExtendedBoard[]> {
    await pool.query('DELETE FROM boards WHERE board_id = $1 RETURNING *;', [
      board_id,
    ]);

    const boards = await this.getBoardsOfUser(user_id);

    return boards;
  }

  // converts array of plain objects from db
  // to array of objects of ExtendedBoard class

  convertToBoards(boardArr): Array<ExtendedBoard> {
    const extBoards = boardArr.map(
      (board) =>
        new ExtendedBoard(
          board.board_name,
          board.board_id,
          board.team_name,
          board.team_id,
        ),
    );

    return extBoards;
  }

  // getting all the boards
  // async getAllBoards(): Promise<ExtendedBoard[]> {
  //   // retrieving all the boards
  //   const boardData = await pool.query(
  //     'SELECT board_id, board_name, boards.team_id, team_name FROM boards LEFT JOIN teams ON boards.team_id = teams.team_id;',
  //   );

  //   //console.log(boardData.rows);

  //   const boards = this.convertToBoards(boardData.rows);

  //   return boards;
  // }
}
