import {
  BankDto,
  BankEntity,
  BankUpdateDto,
  IBankService,
  ITransactionService,
  TransactionServiceTag,
  TransactionEvent,
  TransactionEventType,
} from '@domain';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionType } from '../../core';
import { Repository } from 'typeorm';

@Injectable()
export class BankService implements IBankService {
  @InjectRepository(BankEntity)
  private readonly repository: Repository<BankEntity>;

  @Inject(TransactionServiceTag)
  private readonly transactionService: ITransactionService;

  public async create(dto: BankDto): Promise<BankEntity> {
    const bankEntity = this.repository.create({ ...dto });
    return await this.repository.save(bankEntity);
  }

  public async delete(id: string): Promise<BankEntity> {
    const bankForDelete = await this.repository.findOne({
      where: { id },
    });

    const bankTransaction = await this.transactionService.findBankTransactions(
      id,
    );
    if (!bankForDelete)
      throw new NotFoundException(`Bank with id: ${id} does not exist`);

    if (bankTransaction.length > 0) {
      throw new BadRequestException(
        `Cannot delete bunk with ID ${id} because it has transactions`,
      );
    }
    return await this.repository.remove(bankForDelete);
  }

  public async getOne(id: string): Promise<BankEntity> {
    const bank = await this.repository.findOneBy({ id });
    if (!bank)
      throw new NotFoundException(`Bank with id: ${id} does not exist`);
    return bank;
  }

  public async getAll(): Promise<BankEntity[]> {
    return await this.repository.find();
  }

  public async update(id: string, dto: BankUpdateDto): Promise<BankEntity> {
    await this.repository.update({ id }, { ...dto });
    return await this.getOne(id);
  }

  @OnEvent('transaction.created')
  @OnEvent('transaction.deleted')
  public async recalculateBankBalance(
    payload: TransactionEvent,
  ): Promise<void> {
    const transactionAmount =
      payload.transaction.type === TransactionType.CONSUMABLE
        ? -payload.transaction.amount
        : payload.transaction.amount;
    const money =
      payload.type === TransactionEventType.DELETED
        ? -transactionAmount
        : transactionAmount;

    const resultParameters = {
      bankId: payload.transaction.bankId,
      money,
    };

    await this.repository
      .createQueryBuilder('bank')
      .update({ balance: () => `balance + :money` })
      .where('id = :bankId')
      .setParameters(resultParameters)
      .execute();
  }
}
