import { IsNumber, IsOptional, Min } from 'class-validator';

export class CartItemDto {
	@IsNumber()
	productId: number;

	@IsNumber()
	@IsOptional()
	@Min(0)
	quantity: number = 1;

	@IsNumber()
	@IsOptional()
	variantId: number;

	@IsNumber()
	@IsOptional()
	affiliationLinkId: number;
}
