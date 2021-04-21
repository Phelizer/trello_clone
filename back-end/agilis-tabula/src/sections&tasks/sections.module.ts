import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  controllers: [SectionsController, TasksController],
  providers: [SectionsService, TasksService],
})
export class SectionsModule {}
