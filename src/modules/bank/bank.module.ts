import { BankEntity, BankServiceTag } from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from '../transaction';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity]), TransactionModule],
  controllers: [BankController],
  providers: [{ provide: BankServiceTag, useClass: BankService }],
  exports: [BankServiceTag],
})
export class BankModule {}
