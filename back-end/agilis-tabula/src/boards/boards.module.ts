import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TeamsService } from '../teams/teams.service';

@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [BoardsService, TeamsService],
})
export class BoardsModule {}
