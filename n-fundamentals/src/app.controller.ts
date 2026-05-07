/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from './common/Guards/authGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JWTAuthGuard)
  getProfile(
    @Request()
    req,
  ) {
    return req.user;
  }
}
