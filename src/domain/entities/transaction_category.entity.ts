import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'transaction_categories' })
export class TransactionCategoryEntity {
  @PrimaryColumn('uuid')
  @ManyToOne(() => TransactionEntity, (transaction) => transaction.id)
  public transactionId: string;

  @PrimaryColumn('uuid')
  @ManyToOne(() => CategoryEntity, (category) => category.id)
  public categoryId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
