import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [UserController]
})
export class UserHttpModule {}
