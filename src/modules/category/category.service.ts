import {
  CategoryDto,
  CategoryEntity,
  CategoryStatistic,
  GetStaticDto,
  ICategoryService,
  TransactionCategoryEntity,
  TransactionEntity,
} from '@domain';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

export class CategoryService implements ICategoryService {
  @InjectRepository(CategoryEntity)
  private readonly repository: Repository<CategoryEntity>;
  @InjectRepository(TransactionCategoryEntity)
  private readonly transactionCategoriesRepository: Repository<TransactionCategoryEntity>;

  public async create(dto: CategoryDto): Promise<CategoryEntity> {
    const categoryEntity = new CategoryEntity();

    categoryEntity.name = dto.name;

    return await this.repository.save(categoryEntity);
  }

  public async delete(id: string): Promise<CategoryEntity> {
    const categoryForDelete = await this.repository.findOne({
      where: { id },
    });

    if (!categoryForDelete) {
      throw new NotFoundException(`Category with id: ${id} does not exist`);
    }

    const count = await this.transactionCategoriesRepository.count({
      where: { categoryId: id },
    });

    if (count > 0) {
      throw new BadRequestException(
        `Cannot delete category with ID ${id} because there exists some transaction with it`,
      );
    }

    return await this.repository.remove(categoryForDelete);
  }

  public async getOne(id: string): Promise<CategoryEntity> {
    const category = await this.repository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`Category with id: ${id} does not exist`);
    return category;
  }

  public async getByIds(ids: string[]): Promise<CategoryEntity[]> {
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }

  public async getAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }

  public async update(id: string, dto: CategoryDto): Promise<CategoryEntity> {
    await this.repository.update({ id }, { ...dto });
    return await this.getOne(id);
  }

  public async getStatistics({
    categoryIds,
    fromPeriod,
    toPeriod,
  }: GetStaticDto): Promise<CategoryStatistic[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('c')
      .select([
        'c.name AS name',
        'SUM(CASE WHEN t.type = :consumable THEN -1 * t.amount ELSE t.amount END) AS balance',
      ])
      .innerJoin(TransactionCategoryEntity, 'tc', 'c.id = tc.categoryId')
      .innerJoin(TransactionEntity, 't', 't.id = tc.transactionId')
      .where('c.id IN (:...categoryIds)', { categoryIds })
      .groupBy('c.id')
      .setParameter('consumable', 'consumable');

    if (fromPeriod) {
      queryBuilder.andWhere('t.createdAt >= :fromPeriod', { fromPeriod });
    }

    if (toPeriod) {
      queryBuilder.andWhere('t.createdAt <= :toPeriod', { toPeriod });
    }
    const results = await queryBuilder
      .getRawMany()
      .then((data) =>
        data.map((e) => ({ name: e.name, balance: Number(e.balance) })),
      );
    return results;
  }
}
