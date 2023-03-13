import { ApiProperty } from '@nestjs/swagger';

export class CategoryStatistic {
  @ApiProperty({ type: String, example: 'caegory_name' })
  public name: string;

  @ApiProperty({ type: Number, example: -1000 })
  public balance: number;
}
