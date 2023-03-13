import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { TransactionType } from '../../../core';

export class TransactionDto {
  @ApiProperty({ type: String, example: randomUUID() })
  public bankId: string;

  @ApiProperty({ type: Number })
  public amount: number;

  @ApiProperty({
    description: 'List of posible variants',
    enum: TransactionType,
    isArray: false,
    example: TransactionType.CONSUMABLE,
  })
  public type: TransactionType;

  @ApiProperty({
    description: 'List of categoryId',
    type: [String],
    example: [randomUUID(), randomUUID()],
  })
  @IsUUID(undefined, { each: true })
  public categories: string[];
}
