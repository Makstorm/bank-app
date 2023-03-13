import { TransactionDto } from '../transaction';
import { ApiProperty } from '@nestjs/swagger';

export class WebhookDto {
  @ApiProperty({ type: TransactionDto })
  public payload: TransactionDto;
}
