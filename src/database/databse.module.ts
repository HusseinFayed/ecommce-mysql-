import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseLogger from '../logger/databaseLogger';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        logger: new DatabaseLogger(),
        host: configService.get( process.env.DATABSE_HOST),
        // ...
      })
    }),
  ],
})
export class DatabaseModule {}