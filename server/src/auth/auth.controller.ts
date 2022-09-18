import {
  Controller,
  UseGuards,
  Post,
  Req,
  Get,
  HttpCode,
  HttpStatus,
  Session,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() { }

  @Public()
  @Get('/currentuser')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async signInWithGoogleRedirect(
    @Req() req,
    @Session() session: any,
    @Res() res: Response,
  ) {
    if (!req.user) throw new BadRequestException();
    try {
      const user = await this.authService.googleAuth(req);
      session.user = user;
      res.redirect('http://localhost:3000/events');
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Session() session: any) {
    session = null;
  }
}
