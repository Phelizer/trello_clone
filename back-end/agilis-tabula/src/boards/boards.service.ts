import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  addBoard(name: string): Array<Board> {
    // generating a pseudo id
    const id = Math.floor(Math.random() * (100000 - 0)) + 0;

    if (!name) {
      throw new Error('Invalid name');
    }

    // creating board
    const board = new Board(name, id);
    this.boards.push(board);

    return this.boards;
  }

  getAllBoards(): Array<Board> {
    return this.boards;
  }

  removeBoard(id: number): Array<Board> {
    // error handling
    const searchedBoard = this.boards.find((board) => board.id === id);
    if (!searchedBoard) {
      throw new NotFoundException('Could not find board');
    }

    // deleting the board
    this.boards = this.boards.filter((board) => board.id !== id);
    return this.boards;
  }
}
