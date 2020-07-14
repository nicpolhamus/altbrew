import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { UserHttpModule } from './user/user-http.module';

@Module({
  imports: [
    AuthModule, 
    ConfigModule,
    RouterModule.forRoutes(routes), 
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService
    }),
    UserHttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
