import {
  ITransactionService,
  TransactionDto,
  TransactionModel,
  TransactionServiceTag,
  TransactionGetAllDto,
} from '@domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  @Inject(TransactionServiceTag) private readonly service: ITransactionService;

  @ApiResponse({ type: TransactionModel })
  @Post()
  public async create(@Body() dto: TransactionDto): Promise<TransactionModel> {
    const entity = await this.service.create(dto);
    return TransactionModel.formEntity(entity);
  }

  @ApiResponse({ type: [TransactionModel] })
  @Get()
  public async getAll(
    @Query() dto: TransactionGetAllDto,
  ): Promise<TransactionModel[]> {
    const transaction = await this.service.getAll(dto);
    return transaction.map((e) => TransactionModel.formEntity(e));
  }

  @ApiResponse({ type: TransactionModel })
  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TransactionModel> {
    const entity = await this.service.delete(id);
    return TransactionModel.formEntity(entity);
  }
}
