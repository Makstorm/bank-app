import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('category')
export class CategoryEntity extends AbstractEntity {
  @Column()
  public name: string;

  @ManyToMany(
    () => TransactionEntity,
    (transaction) => transaction.categories,
    { cascade: true },
  )
  public transactions;
}
