import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { IsNull } from 'typeorm';
import { QueryableRelations } from '../globals/lib/type-helpers';
import { CategoriesService } from './categories.service';
import { categoryQueryableRelations, FindCategoryDto } from './dto/find-category.dto';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	findAll(
		@Query() paginated: Paginated,
		@Query() findCategoryDto: FindCategoryDto,
		@Relations(categoryQueryableRelations)
		relations: QueryableRelations<typeof categoryQueryableRelations>,
	) {
		return this.categoriesService.findAll({
			where: {
				isArchived: false,
				superCategoryId: findCategoryDto.superCategoryId ?? IsNull(),
			},
			take: +paginated.limit,
			skip: +paginated.page * +paginated.limit,
			relations,
		});
	}

	@Get(':id')
	findOne(
		@Param('id') id: string,
		@Relations(categoryQueryableRelations)
		relations: QueryableRelations<typeof categoryQueryableRelations>,
	) {
		return this.categoriesService.findOne({
			where: { id: +id, isArchived: false },
			relations,
		});
	}
}
