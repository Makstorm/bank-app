import { WebhookDto } from '../../models';

export interface IWebhookService {
  processTransactionSuccess(dto: WebhookDto): Promise<void>;
  processTransactionFailure(message: string): Promise<void>;
}
