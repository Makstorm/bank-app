import {
  ITransactionService,
  IWebhookService,
  TransactionServiceTag,
  WebhookDto,
} from '@domain';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService implements IWebhookService {
  @Inject(TransactionServiceTag)
  private readonly transactionService: ITransactionService;

  public async processTransactionSuccess(dto: WebhookDto): Promise<void> {
    this.transactionService.create(dto.payload);
  }

  public async processTransactionFailure(message: string): Promise<void> {
    throw new BadRequestException(message);
  }
}
