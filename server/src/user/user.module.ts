import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { envProvider } from 'src/common/environment';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, ...envProvider],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}
