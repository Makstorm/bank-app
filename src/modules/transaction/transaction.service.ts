import {
  BankEntity,
  CategoryServiceTag,
  FindByCategoryIdsDto,
  ICategoryService,
  ITransactionService,
  TransactionCategoryEntity,
  TransactionDto,
  TransactionEntity,
  TransactionEvent,
  TransactionEventType,
  TransactionGetAllDto,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionType } from 'src/core';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService implements ITransactionService {
  public constructor(private eventEmitter: EventEmitter2) {}

  @InjectRepository(TransactionEntity)
  private readonly repository: Repository<TransactionEntity>;
  @InjectRepository(TransactionCategoryEntity)
  private readonly transactionCategory: Repository<TransactionCategoryEntity>;
  @InjectRepository(BankEntity)
  private readonly bankRepository: Repository<BankEntity>;

  @Inject(CategoryServiceTag)
  private readonly categoryService: ICategoryService;

  public async create(dto: TransactionDto): Promise<TransactionEntity> {
    const transactionEntity = new TransactionEntity();

    transactionEntity.amount = dto.amount;
    transactionEntity.type = dto.type;

    const bank = await this.bankRepository.findOneBy({ id: dto.bankId });

    if (!bank) {
      throw new BadRequestException(`There is no bank with id: ${dto.bankId}`);
    }
    transactionEntity.bankId = dto.bankId;

    const categories = await this.categoryService.getByIds(dto.categories);
    if (!(categories.length === dto.categories.length)) {
      throw new BadRequestException(`Some of this categories does not exist`);
    }
    const savedTransaction = await this.repository.save(transactionEntity);

    // Emmiting balance reculculation event
    await this.emitingBankEvent(savedTransaction, TransactionEventType.CREATED);

    //Adding relations to manyToMny table
    const transactionCategories = dto.categories.map((c) => {
      const transactionCategory = new TransactionCategoryEntity();

      transactionCategory.categoryId = c;
      transactionCategory.transactionId = savedTransaction.id;
      return transactionCategory;
    });
    await this.transactionCategory.save(transactionCategories);

    return savedTransaction;
  }
  public async delete(id: string): Promise<TransactionEntity> {
    const transactionForDelete = await this.repository.findOneBy({ id });
    const deletedEntity = await this.repository.remove(transactionForDelete);

    // Emmiting balance reculculation event
    await this.emitingBankEvent(
      transactionForDelete,
      TransactionEventType.DELETED,
    );
    return deletedEntity;
  }
  public async getAll(dto: TransactionGetAllDto): Promise<TransactionEntity[]> {
    const [entities, total] = await this.repository.findAndCount({
      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
    });
    console.log(entities);
    return entities;
  }

  public async findByCategoryIds(
    dto: FindByCategoryIdsDto,
  ): Promise<TransactionEntity[]> {
    // Какаято шляпа переделывай
    console.log(dto);
    const transactions = await this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.categories', 'category')
      .where('category.id IN (:...categoryIds)', {
        categoryIds: dto.categoryIds,
      })
      .getMany();

    //
    transactions.map((t) => console.log(t.categories));
    return transactions;
  }

  public async findBankTransactions(id: string): Promise<TransactionEntity[]> {
    return await this.repository.find({ where: { bankId: id } });
  }

  private async emitingBankEvent(
    transaction: TransactionEntity,
    type: TransactionEventType,
  ): Promise<void> {
    this.eventEmitter.emit(
      'transaction.' + type,
      new TransactionEvent(transaction, type),
    );
  }
}
