import { User } from './../songs/entities/user.entity';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service';
import { use } from 'passport';
import { PayloadType } from './Types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistService,
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
    const payload: PayloadType = {
      email: user.email,
      userId: user.id,
    };
    const artist = await this.artistService.findArtist(user.id);
    if (artist) {
      payload.artistId = artist.id;
    }
    // generate token
    const accessToken = this.jwtService.sign(payload);

    return {
      User: result,
      accessToken,
    };
  }
}
