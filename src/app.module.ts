import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as _entities from './domain/entities';
import {
  BankModule,
  CategoryModule,
  TransactionModule,
  WebhookModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const entitiesArray = Object.values(_entities);
        return {
          type: 'postgres',
          host: config.getOrThrow('DB_HOST'),
          port: config.getOrThrow('DB_PORT'),
          username: config.getOrThrow('DB_USER'),
          password: config.getOrThrow('DB_PASSWORD'),
          database: config.getOrThrow('DB_NAME'),
          entities: entitiesArray,
          synchronize: true,
        };
      },
    }),
    EventEmitterModule.forRoot(),
    BankModule,
    CategoryModule,
    TransactionModule,
    WebhookModule,
  ],
})
export class AppModule {}
