import { User } from '../songs/entities/user.entity';
import { CreateUserDto } from '../users/Dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.create(createUserDto);
  }
}
