import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ type: String })
  public name: string;
}
