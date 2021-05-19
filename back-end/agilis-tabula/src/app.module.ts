import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { SectionsModule } from './sections&tasks/sections.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BoardUpdateGateway } from './synchronization/updates.gateway';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [BoardsModule, SectionsModule, AuthModule, UsersModule, TeamsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    BoardUpdateGateway,
  ],
})
export class AppModule {}
