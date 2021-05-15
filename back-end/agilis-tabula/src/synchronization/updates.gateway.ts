import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardsService } from '../boards/boards.service';

@WebSocketGateway()
export class BoardUpdateGateway {
  // ?
  boardsService = new BoardsService();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('board_update')
  async handleUpdate(
    @MessageBody() teamID: number,
    @ConnectedSocket() client: Socket,
  ) {
    const updatedBoards = await this.boardsService.getBoardsOfTeam(teamID);

    client.to(`teamID-${teamID}`).emit('board_update', updatedBoards);

    // this.server.emit('board_update', updatedBoards);
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

  // to be removed...
  @SubscribeMessage('connection')
  handleConnection() {
    console.log('connected');
  }

  @SubscribeMessage('disconnect')
  handleDisconnect() {
    console.log('disconnected');
  }
}
