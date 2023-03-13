import { BankEntity } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class BankModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String, example: 'Monobank' })
  public name: string;

  @ApiProperty({ type: Number, example: 1000 })
  public balance: number;

  public static formEntity(bank: BankEntity): BankModel {
    if (!bank) {
      return null;
    }
    const model = new BankModel();
    model.id = bank.id;
    model.name = bank.name;
    model.balance = bank.balance;

    return model;
  }
}
