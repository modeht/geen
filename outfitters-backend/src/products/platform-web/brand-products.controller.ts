import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { Between, FindOptionsWhere, ILike } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Relations } from '../../globals/decorators/relations.decorator';
import { QueryableRelations } from '../../globals/lib/type-helpers';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindInventoryDto } from '../dto/find-inventory.dto';
import { productrQueryableRelations } from '../dto/find-prodcuts.dto';
import { MarkOutOfStockDto } from '../dto/mark-out-of-stock.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductsService } from '../products.service';
import { BrandFindProductsDto } from '../dto/brand-find-products.dto';

@ApiTags('Web/Brands/Products')
@Controller('web/brands/products')
@UseGuards(AuthGuard, RoleGuard)
export class WebBrandProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private authContext: AuthContext,
	) {}

	@Post()
	@Roles([Role.Brand])
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto);
	}

	@Put(':id')
	@Roles([Role.Brand])
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(+id, updateProductDto);
	}

	@Get('inventory')
	@Roles([Role.Brand])
	getInventory(
		@Query() pagination: Paginated,
		@Query() findInventoryDto: FindInventoryDto,
	) {
		return this.productsService.getInventory(findInventoryDto, pagination);
	}

	@Get()
	@Roles([Role.Brand])
	findAll(
		@Query() pagination: Paginated,
		@Query() findProductsDto: BrandFindProductsDto,
		@Relations(productrQueryableRelations)
		relations: QueryableRelations<typeof productrQueryableRelations>,
	) {
		const brandId = this.authContext.getUser().sub;
		const findOptionsWhere: FindOptionsWhere<ProductEntity> = {
			isArchived: false,
			brandId,
			isFeatured: findProductsDto.isFeatured,
			categoryId: findProductsDto.categoryId,
			subCategoryId: findProductsDto.subCategoryId,
			title: findProductsDto.name ? ILike(`%${findProductsDto.name}%`) : undefined,
			basePrice: Between(
				findProductsDto.minPrice ?? 0,
				findProductsDto.maxPrice ?? Number.MAX_SAFE_INTEGER,
			),
		};

		return this.productsService.findAll({
			skip: pagination.limit * pagination.page,
			take: pagination.limit,
			where: findOptionsWhere,
			relations: {
				collections: true,
				...relations,
			},
		});
	}

	@Delete(':id')
	@Roles([Role.Brand])
	remove(@Param('id') id: string) {
		return this.productsService.remove(+id);
	}

	@Patch(':id/stock')
	@Roles([Role.Brand])
	updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
		return this.productsService.updateStock(+id, updateStockDto.stock);
	}

	@Patch('out-of-stock')
	@Roles([Role.Brand])
	markOutOfStock(@Body() markOutOfStockDto: MarkOutOfStockDto) {
		return this.productsService.markOutOfStock(markOutOfStockDto.productIds);
	}
}
