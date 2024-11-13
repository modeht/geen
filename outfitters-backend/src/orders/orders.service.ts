import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartsService } from '../carts/carts.service';
import { OrderEntity } from './entities/order.entity';
import { ShippingAddressEntity } from '../users/entities/shipping-address.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { PromotionEntity } from '../promotions/entities/promotion.entity';
import { BrandOrderEntity } from './entities/brand-orders.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { ProductVariantEntity } from '../products/entities/product-variant.entity';
import { Paginated } from '../globals/dto/paginated.dto';
import { CartEntity, CartStatus } from '../carts/entities/cart.entity';

@Injectable()
export class OrdersService {
	constructor(
		private readonly datasource: DataSource,
		private readonly authContext: AuthContext,
		private readonly cartsService: CartsService,
	) {}
	async create(createOrderDto: CreateOrderDto) {
		const userId = this.authContext.getUser()!.sub;
		const cart = await this.cartsService.find(createOrderDto.cartId);

		const shippingAdress = await this.datasource.manager.findOneBy(
			ShippingAddressEntity,
			{ id: createOrderDto.shippingAddressId, shopperId: userId },
		);
		if (cart.shopperId !== userId) {
			throw new BadRequestException('Cart does not belong to user');
		}
		if (cart.items.length === 0) {
			throw new BadRequestException('Cart is empty');
		}
		if (cart.status !== CartStatus.ACTIVE) {
			throw new BadRequestException('Order has already been places for this cart');
		}
		if (!shippingAdress) {
			throw new BadRequestException('Shipping address not found');
		}

		if (shippingAdress.isDefault) {
			throw new BadRequestException('Shipping address is not valid');
		}

		const order = new OrderEntity();
		order.cartId = cart.id;
		order.shopperId = userId;
		order.paymentMethod = createOrderDto.paymentMethod;
		order.shippingAddressId = createOrderDto.shippingAddressId;
		order.totalSalePrice = cart.totalPrice;
		order.totalPurchasePrice = cart.totalDiscountedPrice;
		order.totalShippingFees = Object.values(cart.shippingFees).reduce((a, b) => a + b, 0);

		const brandOrdersDict = {};
		const productIds = [];
		const variantIds = [];

		for (const item of cart.items) {
			const quantity = item.quantity;
			const totalPrice = item.totalPrice;
			const brandId = item.product.brandId;
			const totalPurchasePrice = item.totalDiscountedPrice ?? item.totalPrice;
			const stock = item.variant?.stock ?? item.product.stock;
			const unitSalePrice = item.variant?.price ?? item.product.basePrice;

			if (item.variantId) {
				variantIds.push(item.variantId);
			} else {
				productIds.push(item.productId);
			}

			if (quantity > stock || item.product.isOutOfStock) {
				throw new BadRequestException(`Product ${item.product.title} is out of stock`);
			}
			const orderItem = new OrderItemEntity();
			orderItem.quantity = quantity;
			orderItem.unitSalePrice = unitSalePrice;
			orderItem.unitPurchasePrice = totalPurchasePrice / quantity;
			orderItem.totalSalePrice = totalPrice;
			orderItem.totalPurchasePrice = totalPurchasePrice;
			orderItem.productId = item.product.id;
			orderItem.variantId = item.variant?.id;
			orderItem.promoCodeId = item.promoCodeApplied ? cart.promoCodeId : null;
			orderItem.appliedPromotions = item.appliedpromotionsIds.map(
				(promotionId) => ({ id: promotionId }) as PromotionEntity,
			);

			if (!brandOrdersDict[brandId]) {
				const brandOrder = new BrandOrderEntity();
				brandOrder.totalSalePrice = orderItem.totalSalePrice;
				brandOrder.totalPurchasePrice = orderItem.totalPurchasePrice;
				brandOrder.brandId = brandId;
				brandOrder.shippingFees = cart.shippingFees[item.product.brand.brandName];
				brandOrder.items = [orderItem];

				const expectedDeliveryDate = new Date();
				expectedDeliveryDate.setDate(
					expectedDeliveryDate.getDate() + item.product.deliveryEstimationInDays,
				);
				brandOrder.expectedDeliveryDate = expectedDeliveryDate;

				brandOrdersDict[brandId] = brandOrder;
			} else {
				const brandOrder = brandOrdersDict[brandId];
				brandOrder.totalSalePrice += orderItem.totalSalePrice;
				brandOrder.totalPurchasePrice += orderItem.totalPurchasePrice;

				const currentExpectedDeliveryDate = brandOrder.expectedDeliveryDate;
				const expectedDeliveryDate = new Date();
				expectedDeliveryDate.setDate(
					expectedDeliveryDate.getDate() + item.product.deliveryEstimationInDays,
				);

				if (expectedDeliveryDate > currentExpectedDeliveryDate) {
					brandOrder.expectedDeliveryDate = expectedDeliveryDate;
				}

				brandOrder.items.push(orderItem);
			}
		}

		// TODO: validate payment and create transactions
		// if (order.paymentMethod===OrderPaymentMethod.CARD){}

		order.brandOrders = Object.values(brandOrdersDict);

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			const [newOrder] = await Promise.all([
				tr.manager.save(order),
				tr.manager.update(CartEntity, { id: cart.id }, { status: CartStatus.COMPLETED }),
				tr.manager.decrement(ProductEntity, { id: In(productIds) }, 'stock', 1),
				tr.manager.decrement(ProductVariantEntity, { id: In(variantIds) }, 'stock', 1),
			]);

			await tr.commitTransaction();
			return this.findOne(newOrder.id);
		} catch (error) {
			await tr.rollbackTransaction();
			// TODO: revert the transaction
			throw new BadRequestException('Failed to create order');
		} finally {
			await tr.release();
		}
	}

	async findAll(paginated: Paginated) {
		const userId = this.authContext.getUser()!.sub;
		const [orders, totalCount] = await this.datasource.manager.findAndCount(OrderEntity, {
			where: { shopperId: userId },
			relations: {
				brandOrders: {
					items: {
						variant: { media: true, optionValues: true },
						product: { media: true },
					},
				},
			},
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
		return { orders, totalCount };
	}

	findOne(id: number) {
		const userId = this.authContext.getUser()!.sub;
		return this.datasource.manager.findOne(OrderEntity, {
			where: { id, shopperId: userId },
			relations: {
				brandOrders: {
					items: {
						variant: { media: true },
						product: { media: true },
						appliedPromotions: true,
						appliedPromoCode: true,
					},
					brand: true,
				},
				shippingAddress: true,
			},
		});
	}
}
