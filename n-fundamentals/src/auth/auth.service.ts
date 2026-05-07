import { User } from './../songs/entities/user.entity';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: UserLoginDto,
  ): Promise<{ User: Omit<User, 'password'>; accessToken: string }> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    console.log('LOGIN USER:', user);
    console.log('DB PASSWORD:', user?.password);
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('invalid credentials');
    }

    // remove password
    const { password, ...result } = user;

    // JWT payload
    const payload = {
      email: user.email,
      sub: user.id,
    };

    // generate token
    const accessToken = this.jwtService.sign(payload);

    return {
      User: result,
      accessToken,
    };
  }
}
