import { User } from '../songs/entities/user.entity';
import { CreateUserDto } from '../users/Dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './Dto/luser-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body()loginDto: UserLoginDto){
    return this.authService.login(loginDto);
  }
}
