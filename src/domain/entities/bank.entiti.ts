import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('bank')
export class BankEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column()
  public balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
  public transactions: TransactionEntity[];
}
