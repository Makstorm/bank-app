import { WebhookServiceTag } from '@domain';
import { Module } from '@nestjs/common';
import { TransactionModule } from '../transaction';
import { WebhooController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [TransactionModule],
  providers: [{ provide: WebhookServiceTag, useClass: WebhookService }],
  controllers: [WebhooController],
  exports: [],
})
export class WebhookModule {}
