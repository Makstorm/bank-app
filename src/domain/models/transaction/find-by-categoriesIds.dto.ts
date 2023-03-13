import { IsArray, IsUUID } from 'class-validator';

export class FindByCategoryIdsDto {
  @IsUUID(undefined, { each: true })
  @IsArray()
  public categoryIds: string[];
}
