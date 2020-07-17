import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { mockRepositoryFactory, MockType } from '../common/mock.repository.factory';
import { UserLoginResponseDto } from '../auth/dto/user.login.response.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { userRepositoryConflicts } from './mocks/user.repository.conflicts';
import { CreateUserDto } from './dto/create.user.dto';
import { envProvider } from '../common/environment';

describe('UserService', () => {
  let userService: UserService;
  let repository: MockType<Repository<User>>;
  const testUser: CreateUserDto = {email: 'test@test.com', password: 'test', displayName: 'test-user'};
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepositoryFactory
        },
        ...envProvider
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should create a user', async () => {
    const res = await userService.register(testUser);
    expect(res).toBeInstanceOf(UserLoginResponseDto);
  });
  it('should make user repo unique errors into http conflicts', async () => {
    let err: HttpException;
    await userRepositoryConflicts(repository, async () => {
      try {
        await userService.register(testUser);
      } catch (error) {
        err = error;
      }
      expect(err.getStatus()).toEqual(HttpStatus.CONFLICT);
    });
  });
  it('should find user by email', async () => {
    const user = await userService.findByEmail(testUser.email);
    expect(user.email).toEqual(testUser.email);
  });
});
