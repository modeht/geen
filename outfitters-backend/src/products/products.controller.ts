import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { Between, FindOptionsOrder, FindOptionsWhere, ILike, In } from 'typeorm';
import { QueryableRelations } from '../globals/lib/type-helpers';
import {
	FindProductsDto,
	productrQueryableRelations,
	ProductSortBy,
} from './dto/find-prodcuts.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne({
			where: {
				id: +id,
				brand: { isPublished: true },
			},
			relations: {
				media: true,
				category: true,
				subCategory: true,
				taggedIn: true,
				brand: { cover: true, logo: true },
				options: { values: true },
				variants: { media: true, optionValues: true },
			},
		});
	}

	@Get()
	findAll(
		@Query() pagination: Paginated,
		@Query() findProductsDto: FindProductsDto,
		@Relations(productrQueryableRelations)
		relations: QueryableRelations<typeof productrQueryableRelations>,
	) {
		const findOptionsWhere: FindOptionsWhere<ProductEntity> = {
			isArchived: false,
			brand: { isPublished: true },
			isFeatured: findProductsDto.isFeatured,
			...(findProductsDto.brandId && {
				brandId: In(findProductsDto.brandId),
			}),
			categoryId: findProductsDto.categoryId ?? undefined,
			subCategoryId: findProductsDto.subCategoryId ?? undefined,
			...(findProductsDto.name && { title: ILike(`%${findProductsDto.name}%`) }),
			basePrice: Between(
				findProductsDto.minPrice ?? 0,
				findProductsDto.maxPrice ?? Number.MAX_SAFE_INTEGER,
			),
		};
		let order: FindOptionsOrder<ProductEntity>;
		switch (findProductsDto.sortBy) {
			case ProductSortBy.Newest:
				order = { createdAt: 'DESC' };
				break;
			case ProductSortBy.PriceLowToHigh:
				order = { basePrice: 'ASC' };
				break;
			case ProductSortBy.PriceHighToLow:
				order = { basePrice: 'DESC' };
				break;
			case ProductSortBy.AtoZ:
				order = { title: 'ASC' };
				break;
			case ProductSortBy.ZtoA:
				order = { title: 'DESC' };
				break;
		}

		return this.productsService.findAll(
			{
				skip: pagination.limit * pagination.page,
				take: pagination.limit,
				where: findOptionsWhere,
				relations: {
					...relations,
				},
				order,
			},
			findProductsDto.options,
			findProductsDto.rating,
		);
	}

	@Get('options')
	findAllOptions() {
		return this.productsService.findAllOptions();
	}
}
