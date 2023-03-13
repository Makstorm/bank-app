import {
  CategoryDto,
  CategoryModel,
  CategoryServiceTag,
  CategoryStatistic,
  GetStaticDto,
  ICategoryService,
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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  @Inject(CategoryServiceTag) private readonly service: ICategoryService;

  @ApiResponse({ type: CategoryModel })
  @Post()
  public async create(@Body() dto: CategoryDto): Promise<CategoryModel> {
    const entity = await this.service.create(dto);
    return CategoryModel.formEntity(entity);
  }

  @ApiResponse({ type: CategoryModel })
  @Delete('/:id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CategoryModel> {
    const entity = await this.service.delete(id);
    return CategoryModel.formEntity(entity);
  }

  @Get('/statistics')
  @ApiResponse({ type: [CategoryStatistic] })
  public async getStatistics(
    @Query(new ValidationPipe({ transform: true })) dto: GetStaticDto,
  ): Promise<CategoryStatistic[]> {
    return await this.service.getStatistics(dto);
  }

  @ApiResponse({ type: CategoryModel })
  @Get('/:id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CategoryModel> {
    const entity = await this.service.getOne(id);
    return CategoryModel.formEntity(entity);
  }

  @ApiResponse({ type: [CategoryModel] })
  @Get()
  public async getAll(): Promise<CategoryModel[]> {
    const entity = await this.service.getAll();
    return entity.map((e) => CategoryModel.formEntity(e));
  }

  @ApiResponse({ type: CategoryModel })
  @Put('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    dto: CategoryDto,
  ): Promise<CategoryModel> {
    const entity = await this.service.update(id, dto);
    return CategoryModel.formEntity(entity);
  }
}
