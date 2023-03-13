import {
  IWebhookService,
  TransactionModel,
  WebhookDto,
  WebhookServiceTag,
} from '@domain';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('webhook')
@ApiTags('Webhook')
export class WebhooController {
  @Inject(WebhookServiceTag) private readonly service: IWebhookService;

  @ApiResponse({ type: TransactionModel })
  @Post('yZN835c2rWNti19USZ0J')
  public async processTransactionSuccess(
    @Body() dto: WebhookDto,
  ): Promise<void> {
    this.service.processTransactionSuccess(dto);
  }

  @Post('ROpIsRhqtASCATD0MJQp')
  public async processTransactionFailure(
    @Body() message: string,
  ): Promise<void> {
    this.service.processTransactionFailure(message);
  }
}
