import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { envProvider } from 'src/common/environment';

@Module({
  providers: [ConfigService, ...envProvider],
  exports: [ConfigService]
})
export class ConfigModule {}
