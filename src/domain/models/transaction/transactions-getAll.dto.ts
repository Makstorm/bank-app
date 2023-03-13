import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class TransactionGetAllDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsPositive()
  public page: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsPositive()
  public pageSize: number;
}
