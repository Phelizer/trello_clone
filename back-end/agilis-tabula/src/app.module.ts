import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [BoardsModule, SectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
