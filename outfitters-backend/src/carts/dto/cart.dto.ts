import { CartEntity } from '../entities/cart.entity';

export class CartDto extends CartEntity {
	totalPrice: number;
	totalDiscountedPrice: number;
	shippingFees: Record<string, number>;
	promoCodeErrors: string[];
}
