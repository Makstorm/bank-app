import { BankEntity } from '../../entities';
import { BankDto, BankUpdateDto } from '../../models';

export interface IBankService {
  create(dto: BankDto): Promise<BankEntity>;
  delete(id: string): Promise<BankEntity>;
  getOne(id: string): Promise<BankEntity>;
  getAll(): Promise<BankEntity[]>;
  update(id: string, dto: BankUpdateDto): Promise<BankEntity>;
}
