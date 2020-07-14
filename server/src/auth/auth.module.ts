import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getConfig, envProvider } from 'src/common/environment';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false
    }),
    JwtModule.register({
      secret: getConfig().JWTSECRET,
      signOptions: {
        expiresIn: '3600s'
      }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ...envProvider
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
