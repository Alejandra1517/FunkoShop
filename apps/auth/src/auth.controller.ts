// import { Controller, Get } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getHello(): string {
//     return this.authService.getHello();
//   }
// }


import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth-guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
