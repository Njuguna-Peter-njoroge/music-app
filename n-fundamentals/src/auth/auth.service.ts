/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import { User } from '../songs/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: UserLoginDto): Promise<Omit<User, 'password'>> {
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
    console.log('DB PASSWORD:', user.password);
    const { password, ...result } = user;

    return result;
  }
}
