import { TransactionEntity } from 'src/domain/entities';
import {
  FindByCategoryIdsDto,
  TransactionDto,
  TransactionGetAllDto,
} from '../../models';

export interface ITransactionService {
  create(dto: TransactionDto): Promise<TransactionEntity>;
  delete(id: string): Promise<TransactionEntity>;
  getAll(dto: TransactionGetAllDto): Promise<TransactionEntity[]>;
  findByCategoryIds(dto: FindByCategoryIdsDto): Promise<TransactionEntity[]>;
  findBankTransactions(id: string): Promise<TransactionEntity[]>;
}
