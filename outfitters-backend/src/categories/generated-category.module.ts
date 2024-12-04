import { Module } from '@nestjs/common';
import { CategoryService } from './generated-category.service'
import { CategoryController } from './generated-category.controller'

@Module({
  imports:[],
  controllers:[CategoryController],
  providers:[CategoryService],
  exports:[CategoryService],
})
export class CategoryModule {}
