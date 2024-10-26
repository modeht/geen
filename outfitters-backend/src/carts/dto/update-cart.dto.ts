import { Type } from 'class-transformer';
import {
	IsAlphanumeric,
	IsArray,
	IsNumber,
	IsOptional,
	ValidateNested,
} from 'class-validator';

export class UpdateCartDto {
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => UpdateCartProductDto)
	products: UpdateCartProductDto[];

	@IsAlphanumeric()
	promoCode: string;
}

class UpdateCartProductDto {
	@IsNumber()
	productId: number;

	@IsNumber()
	@IsOptional()
	variantId: number;

	@IsNumber()
	@IsOptional()
	quantity: number;
}
