import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardsModule } from './boards/boards.module';
import { SectionsModule } from './sections&tasks/sections.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [BoardsModule, SectionsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
