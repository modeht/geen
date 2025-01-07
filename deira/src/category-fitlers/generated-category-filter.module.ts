import { Module } from '@nestjs/common';
import { CategoryFilterService } from './generated-category-filter.service';
import { CategoryFilterController } from './generated-category-filter.controller';

@Module({
	imports: [],
	controllers: [CategoryFilterController],
	providers: [CategoryFilterService],
	exports: [CategoryFilterService],
})
export class CategoryFilterModule {}
