import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // TODO: use env file for config values
    return {
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'altbrew',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    };
  }
}
