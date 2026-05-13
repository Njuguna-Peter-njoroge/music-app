/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { UpdateResult } from 'typeorm/browser';
import { User } from '../songs/entities/user.entity';
import { CreateUserDto } from '../users/Dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from '../common/Guards/authGuard';
import { enable2FAType } from './Types/auth-types';
import { PayloadType } from './Types/payload.type';
import { Request } from 'express';
import { ValidateTokenDto } from './Dto/validate-token.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('enable-2fa')
  @UseGuards(JWTAuthGuard)
  enable2FA(
    @Req() req: Request & { user: PayloadType },
  ): Promise<enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Get('disable-2fa')
  @UseGuards(JWTAuthGuard)
  disable2FA(
    @Req() req: Request & { user: { userId: string } },
  ): Promise<{ message: string; result: UpdateResult }> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Post('validate-2FA')
  @UseGuards(JWTAuthGuard)
  validate2FA(
    @Req() req: { user: PayloadType },
    @Body()
    validateTokenDto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }
}
