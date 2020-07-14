import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserLoginResponseDto } from 'src/auth/dto/user.login.response.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserLoginResponseDto> {
    return this.userService.register(createUserDto);
  }
}
