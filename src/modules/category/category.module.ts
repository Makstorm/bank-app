import {
  CategoryEntity,
  CategoryServiceTag,
  TransactionCategoryEntity,
} from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, TransactionCategoryEntity]),
  ],
  controllers: [CategoryController],
  providers: [{ provide: CategoryServiceTag, useClass: CategoryService }],
  exports: [CategoryServiceTag],
})
export class CategoryModule {}
