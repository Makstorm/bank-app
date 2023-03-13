import { CategoryEntity } from '../../entities';
import { CategoryDto, CategoryStatistic, GetStaticDto } from '../../models';

export interface ICategoryService {
  create(dto: CategoryDto): Promise<CategoryEntity>;
  delete(id: string): Promise<CategoryEntity>;
  getOne(id: string): Promise<CategoryEntity>;
  getAll(): Promise<CategoryEntity[]>;
  getByIds(ids: string[]): Promise<CategoryEntity[]>;
  update(id: string, dto: CategoryDto): Promise<CategoryEntity>;
  getStatistics(dto: GetStaticDto): Promise<CategoryStatistic[]>;
}
