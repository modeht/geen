import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOneOptions } from 'typeorm';
import { Utils } from '../../lib/utils';
import { AuthContext } from '../auth/auth.context';
import { Paginated } from '../globals/dto/paginated.dto';
import { MediaEntity } from '../media/entities/media.entity';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { ProductReviewEntity } from './entities/product-review.entity';

@Injectable()
export class ProductReviewsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async findAll(productId: number, paginated: Paginated) {
		const [reviews, totalCount] = await this.dataSource.manager.findAndCount(
			ProductReviewEntity,
			{
				order: { id: 'DESC' },
				where: { productId },
				skip: paginated.limit * paginated.page,
				take: paginated.limit,
				relations: {
					media: true,
					shopperProfile: true,
				},
			},
		);

		return { reviews, totalCount };
	}
	async findOne(opts: FindOneOptions<ProductReviewEntity>, throwIfNotFound = true) {
		const review = await this.dataSource.manager.findOne(ProductReviewEntity, opts);
		if (!review && throwIfNotFound) {
			throw new NotFoundException('Review not found');
		}
		return review;
	}

	create(productId: number, createProductReviewDto: CreateProductReviewDto) {
		const shopperId = this.authContext.getUser().sub;
		const productReview = new ProductReviewEntity();
		productReview.productId = productId;
		productReview.shopperId = shopperId;
		productReview.stars = createProductReviewDto.stars;
		productReview.comment = createProductReviewDto.comment;
		productReview.media = createProductReviewDto.mediaIds?.map((id) => ({
			id,
		})) as MediaEntity[];

		return this.dataSource.manager.save(productReview);
	}

	async update(
		productId: number,
		id: number,
		createProductReviewDto: CreateProductReviewDto,
	) {
		const shopperId = this.authContext.getUser().sub;
		const productReview = await this.findOne({ where: { id, productId, shopperId } });

		productReview.stars = Utils.updatePrimitiveField(
			productReview.stars,
			createProductReviewDto.stars,
			{ allowNull: true },
		);
		productReview.comment = Utils.updatePrimitiveField(
			productReview.comment,
			createProductReviewDto.comment,
			{ allowNull: true },
		);

		if (createProductReviewDto.mediaIds !== undefined) {
			productReview.media =
				createProductReviewDto.mediaIds?.map((id) => ({ id }) as MediaEntity) ?? [];
		}
		await this.dataSource.manager.save(productReview);
		return productReview;
	}

	async findRating(productId: number) {
		const stars = await this.dataSource.manager
			.createQueryBuilder(ProductReviewEntity, 'review')
			.select('AVG(review.stars) OVER()', 'averageRating') // Overall average rating
			.addSelect('COUNT(review.stars) OVER()', 'totalRatingCount') // Overall total ratings
			.addSelect('review.stars', 'star') // Star rating value
			.addSelect('COUNT(review.stars)', 'count') // Count for each star
			.where('review.productId = :productId', { productId })
			.andWhere('review.stars IS NOT NULL')
			.groupBy('review.stars')
			.getRawMany();

		if (!stars.length)
			return { averageRating: 0, totalRatingCount: 0, ratingsBreakdown: [] };

		const rating = {
			averageRating: stars[0].averageRating,
			totalRatingCount: stars[0].totalRatingCount,
			ratingsBreakdown: stars.map((star) => ({
				rating: star.star,
				count: star.count,
			})),
		};

		return rating;
	}

	async remove(productId: number, id: number) {
		const shopperId = this.authContext.getUser().sub;
		const review = await this.findOne({ where: { id, productId, shopperId } });
		await this.dataSource.manager.remove(review);
		return review;
	}
}
