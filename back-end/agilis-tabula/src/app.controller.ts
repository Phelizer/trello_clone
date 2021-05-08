import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Public } from './auth/constants';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('auth/signup')
  async signup(@Body() body) {
    const { username, email, password } = body;
    const user = await this.usersService.createUser(username, email, password);
    const JWT = await this.authService.login(user);

    return JWT;
  }
}
