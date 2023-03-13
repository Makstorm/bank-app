import {
  BankDto,
  BankModel,
  BankServiceTag,
  BankUpdateDto,
  IBankService,
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
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  @Inject(BankServiceTag) private readonly service: IBankService;

  @ApiResponse({ type: BankModel })
  @Post()
  public async create(@Body() dto: BankDto): Promise<BankModel> {
    const entity = await this.service.create(dto);
    return BankModel.formEntity(entity);
  }

  @ApiResponse({ type: BankModel })
  @Delete('/:id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BankModel> {
    const entity = await this.service.delete(id);
    return BankModel.formEntity(entity);
  }

  @ApiResponse({ type: BankModel })
  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BankModel> {
    const entity = await this.service.getOne(id);
    return BankModel.formEntity(entity);
  }

  @ApiResponse({ type: [BankModel] })
  @Get()
  public async getAll(): Promise<BankModel[]> {
    const entity = await this.service.getAll();
    return entity.map((e) => BankModel.formEntity(e));
  }

  @ApiResponse({ type: BankModel })
  @Put('/:id')
  public async edit(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    dto: BankUpdateDto,
  ): Promise<BankModel> {
    const entity = await this.service.update(id, dto);
    return BankModel.formEntity(entity);
  }
}
