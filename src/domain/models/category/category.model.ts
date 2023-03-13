import { CategoryEntity } from '@domain';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CategoryModel {
  @ApiProperty({ type: String, example: randomUUID() })
  public id: string;

  @ApiProperty({ type: String, example: 'food' })
  public name: string;

  public static formEntity(category: CategoryEntity): CategoryModel {
    if (!category) {
      return null;
    }
    const model = new CategoryModel();
    model.id = category.id;
    model.name = category.name;

    return model;
  }
}
