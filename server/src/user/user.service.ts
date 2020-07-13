import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { displayName, email, password } = createUserDto;
    const user = new User();
    user.displayName = displayName;
    user.email = email;
    const salt = await genSalt();
    const pass = await hash(password, salt);
    user.password = pass;

    await this.userRepository.save(user);
    return { email, displayName };
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

    return { email, displayName };
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
