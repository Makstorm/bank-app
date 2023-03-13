import { ApiProperty } from '@nestjs/swagger';

export class BankUpdateDto {
  @ApiProperty({ type: String })
  public name: string;
}
