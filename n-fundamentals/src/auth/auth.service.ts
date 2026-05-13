import { enable2FAType } from './Types/auth-types';
import { User } from './../songs/entities/user.entity';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from './../users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from '../artist/artist.service';
import { use } from 'passport';
import { PayloadType } from './Types/payload.type';
import * as speakeasy from 'speakeasy';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(
    loginDto: UserLoginDto,
  ): Promise<
    | { User: Omit<User, 'password'>; accessToken: string }
    | { validate2FA: string; message: string }
  > {
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
    if (user.enable2FA && user.twoFASecret) {
      return {
        validate2FA: 'http://localhost:3000/auth/validate-2fa',
        message:
          'Please send the one-time password/token from your Google Authenticator App',
      };
    }
    // generate token

    return {
      User: result,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async enable2FA(userId: string): Promise<enable2FAType> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.enable2FA && user.twoFASecret) {
      return { secret: user.twoFASecret };
    }

    const secret = speakeasy.generateSecret();
    console.log(secret);
    // user.twoFASecret = secret.base32;
    await this.usersService.updateSecretKey(user.id, secret.base32);

    return { secret: secret.base32 };
  }
  async disable2FA(
    userId: string,
  ): Promise<{ message: string; result: UpdateResult }> {
    const result = await this.userRepository.update(
      { id: userId },
      {
        twoFASecret: null,
        enable2FA: false,
      },
    );
    return {
      message: 'secret diasbled successfully',
      result,
    };
  }

  async validate2FAToken(
    userId: string,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user.twoFASecret) {
        throw new NotFoundException('2fa is not enabled');
      }

      console.log('SECRET:', user.twoFASecret);
      console.log('TOKEN:', token);
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token,
        encoding: 'base32',
        window: 1, // allows ±30 sec drift
      });

      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      console.error('2FA ERROR:', err);
      throw new UnauthorizedException('error verifying token');
    }
  }
}
