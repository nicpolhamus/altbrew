import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';
import { JwtPayload } from './jwt-payload.model';
import { UserLoginResponseDto } from './dto/user.login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUserLogin(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (await this.passwordIsValid(user, pass)) {
        return user;
      }
    }
    return null;
  }

  async validateUserFromToken(payload: JwtPayload): Promise<boolean> {
    const user = await this.userService.findByEmail(payload.email);
    return this.validateUser(user);
  }

  private validateUser(user: User): boolean {
    return user !== null;
  }

  private async passwordIsValid(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  async login(user: UserDto): Promise<UserLoginResponseDto> {
    const payload = { email: user.email, sub: user.id };
    return {...user, token: this.jwtService.sign(payload) };
  }
}
