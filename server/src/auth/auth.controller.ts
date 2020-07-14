import { Controller, UseGuards, Post, Request, UseFilters, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserLoginRequestDto } from './dto/user.login.request.dto';
import { LoginGuard } from 'src/common/guards/login.guard';
import { AuthExceptionFilter } from 'src/common/filters/auth.exceptions.filter';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LoginGuard)
  @Post('login')
  @ApiBody({ type: UserLoginRequestDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout() {
    return {};
  }
}
