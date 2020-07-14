import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from 'src/common/environment';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject('ENVIRONMENT_CONFIG')
    private readonly envConfig: Environment
  ) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // TODO: use env file for config values
    return {
      type: 'postgres',
      host: this.envConfig.DBURI,
      port: this.envConfig.DBPORT,
      username: this.envConfig.DBUSER,
      password: this.envConfig.DBPASS,
      database: this.envConfig.DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    };
  }
}
