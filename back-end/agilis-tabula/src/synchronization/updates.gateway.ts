import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardsService } from '../boards/boards.service';
import { SectionsService } from '../sections&tasks/sections.service';
import { TasksService } from '../sections&tasks/tasks.service';

@WebSocketGateway()
export class BoardUpdateGateway {
  // ?
  boardsService = new BoardsService();
  sectionsService = new SectionsService();
  tasksService = new TasksService();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('board_update')
  async handleUpdate(
    @MessageBody() teamID: number,
    @ConnectedSocket() client: Socket,
  ) {
    const updatedBoards = await this.boardsService.getBoardsOfTeam(teamID);

    client.to(`teamID-${teamID}`).emit('board_update', updatedBoards);
  }

  // user subscribes on board updates of certain team
  @SubscribeMessage('subscribe_to_board_update')
  handleBoardSubscription(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamID: number,
  ) {
    client.join(`teamID-${teamID}`);
  }

  // user unsubscribes from board updates of certain team
  @SubscribeMessage('unsubscribe_from_board_update')
  handleBoardUnsubscription(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamID: number,
  ) {
    client.leave(`teamID-${teamID}`);
  }

  // user subscribes on inner board updates of certain board
  @SubscribeMessage('subscribe_to_in-board_update')
  handleInBoardSubscription(
    @ConnectedSocket() client: Socket,
    @MessageBody() boardID: number,
  ) {
    console.log('subscribe_to_in-board_update');

    client.join(`boardID-${boardID}`);
  }

  // user unsubscribes from inner board updates of certain board
  @SubscribeMessage('unsubscribe_from_in-board_update')
  handleInBoardUnsubscription(
    @ConnectedSocket() client: Socket,
    @MessageBody() boardID: number,
  ) {
    console.log('unsubscribe_from_in-board_update');

    client.leave(`boardID-${boardID}`);
  }

  @SubscribeMessage('in-board_update')
  async handleInBoardUpdate(
    @MessageBody() boardID: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('in-board_update');

    const [sections, tasks] = await Promise.all([
      this.sectionsService.getAllSections(boardID),
      this.tasksService.getAllTasks(boardID),
    ]);

    client.to(`boardID-${boardID}`).emit('in-board_update', [sections, tasks]);
  }

  // // to be removed...
  // @SubscribeMessage('connection')
  // handleConnection() {
  //   console.log('connected');
  // }

  // @SubscribeMessage('disconnect')
  // handleDisconnect() {
  //   console.log('disconnected');
  // }
}
