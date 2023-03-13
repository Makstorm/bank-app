import { TransactionEntity } from '../../entities';

export const enum TransactionEventType {
  CREATED = 'created',
  DELETED = 'deleted',
}

export class TransactionEvent {
  public constructor(
    public readonly transaction: TransactionEntity,
    public readonly type: TransactionEventType,
  ) {}
}
