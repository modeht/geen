import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/types';
import { Paginated } from '../globals/dto/paginated.dto';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { ProductReviewsService } from './product-reviews.service';

@ApiTags('Products/Reviews')
@Controller('products/:id/reviews')
@UseGuards(AuthGuard, RoleGuard)
export class ProductReviewsController {
	constructor(private readonly productReviewsService: ProductReviewsService) {}

	@Get()
	@Roles(['*'])
	findAll(@Param('id') productId: string, @Query() paginated: Paginated) {
		return this.productReviewsService.findAll(+productId, paginated);
	}

	@Post()
	@Roles([Role.Shopper, Role.Outfitter])
	create(
		@Param('id') productId: string,
		@Body() createProductReviewDto: CreateProductReviewDto,
	) {
		return this.productReviewsService.create(+productId, createProductReviewDto);
	}

	@Put(':reviewId')
	@Roles([Role.Shopper, Role.Outfitter])
	update(
		@Param('id') productId: string,
		@Param('reviewId') id: string,
		@Body() createProductReviewDto: CreateProductReviewDto,
	) {
		return this.productReviewsService.update(+productId, +id, createProductReviewDto);
	}

	@Get('rating')
	@Roles(['*'])
	findRating(@Param('id') productId: string) {
		return this.productReviewsService.findRating(+productId);
	}

	@Delete(':reviewId')
	@Roles([Role.Shopper, Role.Outfitter])
	delete(@Param('id') productId: string, @Param('reviewId') id: string) {
		return this.productReviewsService.remove(+productId, +id);
	}
}
