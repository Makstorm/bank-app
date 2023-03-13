import {
  BankEntity,
  TransactionCategoryEntity,
  TransactionEntity,
  TransactionServiceTag,
} from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      TransactionCategoryEntity,
      BankEntity,
    ]),
    CategoryModule,
  ],
  providers: [{ provide: TransactionServiceTag, useClass: TransactionService }],
  controllers: [TransactionController],
  exports: [TransactionServiceTag],
})
export class TransactionModule {}
