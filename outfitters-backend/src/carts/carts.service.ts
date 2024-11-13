import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { CartEntity, CartStatus } from './entities/cart.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { AccountStatus } from '../users/entities/user.entity';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemsEntity } from './entities/cart-item.entity';
import { CartItemDto } from './dto/cart-item.dto';
import { PromoCodeEntity } from '../promotions/entities/promo-code.entity';
import { CartDto } from './dto/cart.dto';
import { PromotionStatusEnum, PromotionTypeEnum } from '../promotions/entities/enums';

@Injectable()
export class CartsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async find(cartId?: number): Promise<CartDto> {
		if (!cartId) cartId = await this._getDefaultCartId();
		const today = new Date();

		const cart = await this.dataSource.manager
			.createQueryBuilder(CartEntity, 'cart')
			.where('cart.id = :cartId', { cartId })
			.leftJoinAndSelect('cart.items', 'items')
			.leftJoinAndSelect('items.product', 'product')
			.leftJoinAndSelect('product.media', 'media')
			.leftJoinAndSelect('product.brand', 'brand')
			.leftJoinAndSelect(
				'product.promotions',
				'promotion',
				'promotion.start <= :today AND promotion.end >= :today AND promotion.status = :status',
				{ today, status: PromotionStatusEnum.Active },
			)
			.leftJoinAndSelect('promotion.products', 'promoProducts')
			.leftJoinAndSelect('items.variant', 'variant')
			.leftJoinAndSelect('variant.media', 'variantMedia')
			.leftJoinAndSelect('variant.optionValues', 'optionValues')
			.leftJoinAndSelect('cart.promoCode', 'promoCode')
			.leftJoinAndSelect('promoCode.products', 'promoCodeProducts')
			.leftJoinAndSelect('promoCode.brand', 'promoCodeBrand')
			.addSelect('brand.currency')
			.getOne();

		if (!cart) throw new NotFoundException('Cart not found');

		let promoCodeErrors: string[] = [];
		if (cart.promoCode) {
			promoCodeErrors = this._validatePromoCode(cart.promoCode, cart);
			if (promoCodeErrors.length > 0) {
				await this.dataSource.manager.update(
					CartEntity,
					{ id: cart.id },
					{ promoCodeId: null },
				);
				cart.promoCode = null;
			}
		}

		const { shippingFees, totalPrice, totalDiscountedPrice } = this.calculateCosts(cart);

		cart.items.forEach((item) =>
			item.product.promotions.forEach((p) => delete p.products),
		);

		const response = {
			...cart,
			promoCodeErrors,
			shippingFees,
			totalPrice,
			totalDiscountedPrice,
		};
		return response;
	}

	async addProduct(cartItemDto: CartItemDto, overwriteQuantity = false) {
		const { productId, variantId, quantity } = cartItemDto;
		const affiliationLinkId = cartItemDto.affiliationLinkId || undefined;

		const product = await this.dataSource.manager.findOne(ProductEntity, {
			where: {
				id: productId,
				isArchived: false,
				variants: { id: variantId, isArchived: false },
				brand: { isPublished: true, user: { status: AccountStatus.Active } },
			},
			relations: { variants: true },
		});

		if (!product) throw new NotFoundException('Product not found');
		if (product.isOutOfStock) throw new BadRequestException('Product is out of stock');
		if (product.variants?.length && !variantId)
			throw new BadRequestException('VariantId is required');

		const stock = variantId
			? product.variants.find((v) => v.id === variantId).stock
			: product.stock;

		if (stock < quantity) {
			throw new BadRequestException(
				`Not enough stock available, remaining stock: ${stock}`,
			);
		}

		const cartId = await this._getDefaultCartId();

		// Check if the product is already in the cart
		const cartItem = await this.dataSource.manager.findOneBy(CartItemsEntity, {
			cartId,
			productId,
			variantId,
		});

		// If the product is already in the cart, update the quantity
		if (cartItem) {
			const quantityToAdd = overwriteQuantity ? quantity : cartItem.quantity + quantity;

			await this.dataSource.manager.update(
				CartItemsEntity,
				{ cartId, productId, variantId },
				{ quantity: quantityToAdd, affiliationLinkId },
			);
		} else {
			// If the product is not in the cart, add it
			await this.dataSource.manager.insert(CartItemsEntity, {
				cartId,
				productId,
				variantId,
				quantity,
				affiliationLinkId,
			});
		}

		return this.find(cartId);
	}

	async updateProduct(cartItemDto: CartItemDto) {
		if (cartItemDto.quantity === 0) return this.removeProduct(cartItemDto);
		return this.addProduct(cartItemDto, true);
	}

	async removeProduct(cartItemDto: CartItemDto) {
		const { productId, variantId } = cartItemDto;
		const cartId = await this._getDefaultCartId();
		await this.dataSource.manager.delete(CartItemsEntity, {
			cartId,
			productId,
			variantId,
		});
		return this.find(cartId);
	}

	async addPromoCode(code: string) {
		const promoCode = await this.dataSource.manager.findOne(PromoCodeEntity, {
			where: {
				code,
			},
			relations: { products: true, brand: true },
		});
		const cart = await this.find();

		const errors = await this._validatePromoCode(promoCode, cart);
		if (errors.length) throw new BadRequestException(errors.join(', '));

		await this.dataSource.manager.update(
			CartEntity,
			{ id: cart.id },
			{ promoCodeId: promoCode.id },
		);

		return this.find(cart.id);
	}

	async removePromoCode() {
		const cartId = await this._getDefaultCartId();
		await this.dataSource.manager.update(
			CartEntity,
			{ id: cartId },
			{ promoCodeId: null },
		);
		return this.find(cartId);
	}

	async update(updateCartDto: UpdateCartDto) {
		const cart = await this.find();

		if (updateCartDto.products == null) cart.items = null;
		if (updateCartDto.products) {
			const products = await this.dataSource.manager.findBy(ProductEntity, {
				id: In(updateCartDto.products.map((p) => p.productId)),
				isArchived: false,
				variants: {
					id: In(updateCartDto.products.map((p) => p.variantId)),
					isArchived: false,
				},
				brand: { isPublished: true, user: { status: AccountStatus.Active } },
			});

			if (products.length !== updateCartDto.products.length) {
				throw new NotFoundException('Product not found');
			}

			cart.items = updateCartDto.products.map(
				(p) =>
					({
						productId: p.productId,
						quantity: p.quantity,
					}) as CartItemsEntity,
			);
		}

		if (updateCartDto.promoCode && updateCartDto.promoCode !== cart.promoCode?.code) {
			const promoCode = await this.dataSource.manager.findOne(PromoCodeEntity, {
				where: {
					code: updateCartDto.promoCode,
				},
				relations: { products: true, brand: true },
			});
			const errors = await this._validatePromoCode(promoCode, cart);
			if (errors.length) throw new BadRequestException(errors.join(', '));
			cart.promoCodeId = promoCode.id;
		}

		await this.dataSource.manager.save(CartEntity, cart);
		return this.find(cart.id);
	}

	async clearCart() {
		const cartId = await this._getDefaultCartId();
		await Promise.all([
			this.dataSource.manager.update(CartEntity, { id: cartId }, { promoCodeId: null }),
			this.dataSource.manager.delete(CartItemsEntity, { cartId }),
		]);
		return this.find(cartId);
	}

	private _validatePromoCode(promoCode: PromoCodeEntity, cart: CartEntity) {
		const today = new Date();
		const errors = [];

		if (!promoCode) errors.push('Invalid promo code');
		if (promoCode.status !== PromotionStatusEnum.Active)
			errors.push('Promo code is no longer active');
		if (promoCode.start > today || promoCode.end < today)
			errors.push('Promo code expired');

		if (promoCode.status !== PromotionStatusEnum.Active)
			errors.push('Promo code is no longer active');

		if (promoCode.start > today || promoCode.end < today)
			errors.push('Promo code expired');

		// TODO: Adjust the following conditions based on the business logic
		if (promoCode.totalLimit && false) errors.push('Promo code ussage limit reached');

		if (promoCode.perUserLimit && false)
			errors.push('Promo code ussage limit reached by you');

		const promoCodeProductIds = promoCode.products.map((p) => p.id);
		const validProducts = cart.items.filter((item) =>
			promoCodeProductIds.includes(item.productId),
		);

		const totalNumberofValidProducts = validProducts.reduce(
			(acc, item) => acc + item.quantity,
			0,
		);

		// TODO: confirm with product, if minPurchaseAmount is the total number of products or the total price of the products
		if (
			promoCode.minPurchaseAmount &&
			totalNumberofValidProducts < promoCode.minPurchaseAmount
		) {
			errors.push(
				`This code works only for specified products sold by ${promoCode.brand.brandName} and the minimum purchase amount is ${promoCode.minPurchaseAmount}`,
			);
		}

		return errors;
	}

	private calculateCosts(cart: CartEntity) {
		let shippingFees = {};
		let totalPrice = 0;
		let totalDiscountedPrice = 0;

		// Calculate the base shipping fees for each brand
		const brands = cart.items
			.map((p) => ({
				id: p.product.brand.id,
				brandName: p.product.brand.brandName,
				shippingCost: p.product.brand.shippingCost,
			}))
			.filter(
				(brand, index, self) =>
					index === self.findIndex((t) => t.brandName === brand.brandName),
			);
		shippingFees = brands.reduce((acc, brand) => {
			acc[brand.id] = brand.shippingCost;
			return acc;
		}, {});

		this._applyPromotion(cart, shippingFees);
		this._applyPromoCode(cart, shippingFees);

		cart.items.forEach((item) => {
			item.promoCodeApplied = item.promoCodeApplied ?? false;
			item.totalPrice =
				item.totalPrice ??
				item.quantity * (item.variant?.price ?? item.product.basePrice);
			item.totalDiscountedPrice = item.totalDiscountedPrice ?? null;
			totalDiscountedPrice += item.totalDiscountedPrice ?? item.totalPrice;
			totalPrice += item.totalPrice;
		});

		shippingFees = brands.reduce((acc, brand) => {
			acc[brand.brandName] = shippingFees[brand.id];
			return acc;
		}, {});

		return { shippingFees, totalPrice, totalDiscountedPrice };
	}

	private async _applyPromotion(cart: CartEntity, shippingFees) {
		const promotions = cart.items.flatMap((p) => p.product.promotions);
		const promotionsIds = promotions.map((p) => p.id);
		const uniquePromotions = Array.from(new Set(promotionsIds)).map((id) =>
			promotions.find((p) => p.id === id),
		);
		const promotionProductIds = uniquePromotions.map((p) => ({
			id: p.id,
			type: p.type,
			brandId: p.brandId,
			minPurchaseAmount: p.minPurchaseAmount,
			discountPercentage: p.discountPercentage,
			productsIds: p.products.map((product) => product.id),
		}));

		for (const promotion of promotionProductIds) {
			const validProducts = cart.items.filter((item) =>
				promotion.productsIds.includes(item.productId),
			);
			const totalNumberofValidProducts = validProducts.reduce(
				(acc, item) => acc + item.quantity,
				0,
			);

			if (
				promotion.minPurchaseAmount &&
				totalNumberofValidProducts < promotion.minPurchaseAmount
			)
				continue;

			this._applyPromoToItems(
				'Promotion',
				validProducts,
				promotion.type,
				promotion.brandId,
				promotion.id,
				shippingFees,
				promotion.discountPercentage,
			);
		}
	}

	private async _applyPromoCode(cart: CartEntity, shippingFees) {
		if (!cart.promoCode) return;

		const promoCodeProductIds = cart.promoCode.products.map((p) => p.id);
		const validProducts = cart.items.filter((item) =>
			promoCodeProductIds.includes(item.productId),
		);

		this._applyPromoToItems(
			'PromoCode',
			validProducts,
			cart.promoCode.type,
			cart.promoCode.brandId,
			cart.promoCode.id,
			shippingFees,
			cart.promoCode.discountPercentage,
		);
	}

	private async _applyPromoToItems(
		promoType: 'Promotion' | 'PromoCode',
		items: CartItemsEntity[],
		type: PromotionTypeEnum,
		brandId: number,
		promoId: number,
		shippingFees,
		disscountPercentage?: number,
	) {
		items.forEach((item) => {
			if (promoType === 'PromoCode') item.promoCodeApplied = true;
			if (promoType === 'Promotion') item.appliedpromotionsIds.push(promoId);

			switch (type) {
				case PromotionTypeEnum.Discount:
					item.totalPrice =
						item.quantity * (item.variant?.price ?? item.product.basePrice);
					item.totalDiscountedPrice =
						item.quantity *
						(item.variant?.price ?? item.product.basePrice) *
						(1 - disscountPercentage / 100);

					break;
				case PromotionTypeEnum.BuyOneGetOne:
					const freeItems = Math.floor(item.quantity / 2);
					item.quantity += freeItems;
					item.totalPrice =
						item.quantity * (item.variant?.price ?? item.product.basePrice);
					item.totalDiscountedPrice =
						(item.quantity - freeItems) * (item.variant?.price ?? item.product.basePrice);
					break;
				case PromotionTypeEnum.FreeShipping:
					shippingFees[brandId] = 0;
			}
		});
	}

	private async _getDefaultCartId() {
		const userId = this.authContext.getUser()!.sub;
		const cart = await this.dataSource.manager.findOneBy(CartEntity, {
			shopperId: userId,
			status: CartStatus.ACTIVE,
		});
		if (cart) return cart.id;

		const newCart = await this.dataSource.manager.insert(CartEntity, {
			shopperId: userId,
		});
		return newCart.identifiers[0].id;
	}
}
