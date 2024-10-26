import { Controller, Get, Injectable, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { ILike } from 'typeorm';
import { QueryableRelations } from '../globals/lib/type-helpers';
import { CollectionsService } from './collections.service';
import {
	collectionQueryableRelations,
	FindCollectionsDto,
} from './dto/find-collections.dto';

@Injectable()
@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Get()
	@UseGuards(AuthGuard)
	findAll(
		@Query() findCollectionsDto: FindCollectionsDto,
		@Query() paginated: Paginated,
		@Relations(collectionQueryableRelations)
		relations: QueryableRelations<typeof collectionQueryableRelations>,
	) {
		return this.collectionsService.findAll({
			take: +paginated.limit,
			skip: +paginated.limit * +paginated.page,
			where: {
				isPublic: true,
				brandId: findCollectionsDto.brandId,
				isFeatured: findCollectionsDto.isFeatured,
				brand: {
					isPublished: true,
					storeName: ILike(`%${findCollectionsDto.brandName ?? ''}%`),
				},
				products: {
					categoryId: findCollectionsDto.categoryId,
					subCategoryId: findCollectionsDto.subcategoryId,
				},
			},
			relations,
		});
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	findOne(
		@Param('id') id: string,
		@Relations(collectionQueryableRelations)
		relations: QueryableRelations<typeof collectionQueryableRelations>,
	) {
		// TODO: discuss with frontend team, if the return format is correct
		return this.collectionsService.findOne({
			where: {
				brand: { isPublished: true },
				isPublic: true,
				id: +id,
			},
			relations,
		});
	}
}
