import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserLoginResponseDto } from 'src/auth/dto/user.login.response.dto';
import { JwtPayload } from 'src/auth/jwt-payload.model';
import { Environment } from 'src/common/environment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('ENVIRONMENT_CONFIG')
    private readonly envConfig: Environment
  ) { }

  private async create(createUserDto: CreateUserDto): Promise<User> {
    const { displayName, email, password } = createUserDto;
    const user = new User();
    user.displayName = displayName;
    user.email = email;
    const salt = await genSalt();
    const pass = await hash(password, salt);
    user.password = pass;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.original.constraint === 'user_email_key') {
        throw new HttpException(
          `A user with email ${error.errors[0].value} already exists`,
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async signToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id
    };
    const token = sign(payload, this.envConfig.JWTSECRET, {});
    return token;
  }

  async register(createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
    const user = await this.create(createUserDto);
    const token = await this.signToken(user);
    return {token};
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email});
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const { email, displayName, profilePicture } = updateUserDto;
    const user = await this.findByEmail(email);
    if (displayName) {
      user.displayName = displayName;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture.toString('hex');
    }

    await this.userRepository.save(user);

    return { email, displayName, id: user.id };
  }

  async delete(email: string): Promise<number> {
    try {
      const result = await this.userRepository.softDelete({email});
      return result.affected;
    } catch (error) {
      console.log(`user delete error: ${error}`);
    }
  }
}
