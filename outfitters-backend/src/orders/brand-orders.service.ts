import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { BrandOrderEntity, OrderStatusEnum } from './entities/brand-orders.entity';
import { RateOrderDto } from './dto/rate-order.dto';
import { AuthContext } from '../auth/auth.context';

@Injectable()
export class BrandOrdersService {
	constructor(
		private readonly datasource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async findAll(opts: FindManyOptions<BrandOrderEntity>) {
		const [orders, totalCount] = await this.datasource.manager
			.createQueryBuilder(BrandOrderEntity, 'brandOrder')
			.setFindOptions({ ...opts })
			.leftJoin('brandOrder.order', 'order')
			.addSelect(['order.paymentMethod', 'order.paymentStatus'])
			.leftJoinAndSelect('order.shopperProfile', 'shopperProfile')
			.leftJoin('shopperProfile.user', 'user')
			.addSelect(['user.email', 'user.phone'])
			.orderBy('brandOrder.createdAt', 'DESC')
			.getManyAndCount();
		return { orders, totalCount };
	}

	async findOne(opts: FindOptionsWhere<BrandOrderEntity>) {
		const row = await this.datasource.manager
			.createQueryBuilder(BrandOrderEntity, 'brandOrder')
			.setFindOptions({ where: opts })
			.select([
				'brandOrder',
				'order.paymentMethod',
				'order.paymentStatus',
				'user.email',
				'user.phone',
			])
			.leftJoinAndSelect('brandOrder.items', 'orderItems')
			.leftJoinAndSelect('orderItems.product', 'product')
			.leftJoinAndSelect('orderItems.variant', 'variant')
			.leftJoinAndSelect('variant.optionValues', 'optionValues')
			.leftJoinAndSelect('variant.media', 'variantMedia')
			.leftJoinAndSelect('product.media', 'media')
			.leftJoin('brandOrder.order', 'order')
			.leftJoinAndSelect('order.shippingAddress', 'shippingAddress')
			.leftJoinAndSelect('order.shopperProfile', 'shopperProfile')
			.leftJoinAndSelect('shopperProfile.profilePicture', 'profilePicture')
			.loadRelationCountAndMap('shopperProfile.ordersCount', 'shopperProfile.orders')
			.leftJoin('shopperProfile.user', 'user')
			.leftJoinAndSelect(
				'product.ratings',
				'reviews',
				'reviews.shopperId = "shopperProfile".id',
			)
			.leftJoinAndSelect('reviews.media', 'reviewMedia')
			.getOne();

		if (!row) throw new BadRequestException('Order not found');
		return row;
	}

	// TODO: Discuss with product the conditions for updating the status of an order
	// TODO: If the status is cancelled, revert the stock of the products? and revert the transaction
	async updateStatus(id: number, status: OrderStatusEnum) {
		const brandId = this.authContext.getUser().sub;
		const brandOrder = await this.datasource.manager.findOneBy(BrandOrderEntity, {
			id,
			brandId,
		});

		if (!brandOrder) {
			throw new BadRequestException('Brand order not found');
		}

		brandOrder.status = status;
		if (status === OrderStatusEnum.InProgress) brandOrder.acceptedAt = new Date();
		if (status === OrderStatusEnum.OutForDelivery) brandOrder.shippedAt = new Date();
		if (status === OrderStatusEnum.Delivered) brandOrder.deliveredAt = new Date();
		if (status === OrderStatusEnum.Cancelled) brandOrder.cancelledAt = new Date();

		await this.datasource.manager.update(BrandOrderEntity, brandOrder.id, {
			status: brandOrder.status,
			acceptedAt: brandOrder.acceptedAt,
			shippedAt: brandOrder.shippedAt,
			deliveredAt: brandOrder.deliveredAt,
			cancelledAt: brandOrder.cancelledAt,
		});
		return { id, status: status };
	}

	async rate(orderId: number, brandOrderId: number, rateOrderDto: RateOrderDto) {
		const userId = this.authContext.getUser().sub;
		const brandOrder = await this.datasource.manager.findOneBy(BrandOrderEntity, {
			orderId: orderId,
			id: brandOrderId,
			order: { shopperId: userId },
		});
		if (!brandOrder) {
			throw new BadRequestException('Brand order not found');
		}

		if (brandOrder.status !== OrderStatusEnum.Delivered) {
			throw new BadRequestException('Order is not delivered yet');
		}

		brandOrder.rating = rateOrderDto.rating ?? brandOrder.rating;
		brandOrder.review = rateOrderDto.review ?? brandOrder.review;

		await this.datasource.manager.save(brandOrder);

		return {
			orderId,
			brandOrderId,
			rating: brandOrder.rating,
			review: brandOrder.review,
		};
	}
}
