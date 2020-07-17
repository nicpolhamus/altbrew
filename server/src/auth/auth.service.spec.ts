import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { mockRepositoryFactory, MockType } from '../common/mock.repository.factory';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { envProvider } from '../common/environment';
import { createTestUser } from './mock/create.test.user';
import { userRepoWithUser } from './mock/user.repository.with.a.user';
import { JwtPayload } from './jwt-payload.model';
import { userRepositoryEmpty } from './mock/user.repository.empty';

describe('AuthService', () => {
  let authService: AuthService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepositoryFactory
        },
        {
          provide: 'JWT_MODULE_OPTIONS',
          useValue: {}
        },
        ...envProvider
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('User validation tests', () => {
    it('should validate user if password is correct', async () => {
      const user = await createTestUser({password: '09876'});
      await userRepoWithUser(repository, user, async () => {
        const validUser = await authService.validateUserLogin(user.email, '09876');
        expect(validUser).toBeDefined();
      });
    });
    it('shouldn\'t validate user if password is incorrect', async () => {
      const user = await createTestUser({password: '09876'});
      await userRepoWithUser(repository, user, async () => {
        const invalidUser = await authService.validateUserLogin(user.email, '67890');
        expect(invalidUser).toBeNull();
      });
    });
    it('shouldn\'t validate user with an invalid token (nonexistent user email in token)', async () => {
      const payload: JwtPayload = {
        email: 'fake@test.com'
      };
      await userRepositoryEmpty(repository, async () => {
        const valid = await authService.validateUserFromToken(payload);
        expect(valid).toBeFalsy();
      });
    });
  });
});
