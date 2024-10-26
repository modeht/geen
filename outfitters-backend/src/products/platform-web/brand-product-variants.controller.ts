import {
	Body,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { ProductVariantsService } from '../product-variants.service';

@ApiTags('Web/Brands/Products/variants')
@Controller('web/brands/products/:id/variants')
@UseGuards(AuthGuard, RoleGuard)
export class WebBrandProductVariantsController {
	constructor(private readonly productVariantsService: ProductVariantsService) {}

	@Post()
	@Roles([Role.Brand])
	create(
		@Param('id') productId: string,
		@Body() createProductVariantDto: CreateProductVariantDto,
	) {
		return this.productVariantsService.create(+productId, createProductVariantDto);
	}

	@Put(':variantId')
	@Roles([Role.Brand])
	update(
		@Param('id') productId: string,
		@Param('variantId') variantId: string,
		@Body() updateProductVariantDto: UpdateProductVariantDto,
	) {
		return this.productVariantsService.update(
			+productId,
			+variantId,
			updateProductVariantDto,
		);
	}

	@Delete(':variantId')
	@Roles([Role.Brand])
	delete(@Param('id') productId: string, @Param('variantId') variantId: string) {
		return this.productVariantsService.remove(+productId, +variantId);
	}

	@Patch(':variantId/stock')
	@Roles([Role.Brand])
	updateStcok(
		@Param('id') productId: string,
		@Param('variantId') variantId: string,
		@Body() updateStockDto: UpdateStockDto,
	) {
		return this.productVariantsService.updateStock(
			+productId,
			+variantId,
			updateStockDto.stock,
		);
	}
}
