import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  boards: Board[] = [];

  addBoard(name: string): number {
    const id = Math.floor(Math.random() * (Number.MAX_VALUE - 0)) + 0;

    const board = new Board(name, id);
    this.boards.push(board);

    return id;
  }
}
