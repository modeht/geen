import {
	IsDate,
	IsEnum,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	ValidateIf,
} from 'class-validator';
import { OrderPaymentMethod } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
	@IsNumber()
	cartId: number;

	@IsNumber()
	shippingAddressId: number;

	@ApiProperty({
		enum: OrderPaymentMethod,
		required: true,
		description: Object.values(OrderPaymentMethod).join(','),
	})
	@IsEnum(OrderPaymentMethod)
	paymentMethod: OrderPaymentMethod;

	@IsString()
	@ValidateIf((params) => params.paymentMethod === OrderPaymentMethod.CARD)
	nameOnCard: string;

	@IsString()
	@ValidateIf((params) => params.paymentMethod === OrderPaymentMethod.CARD)
	cardNumber: string;

	@IsDate()
	@Transform((params) => new Date(params.value))
	@ValidateIf((params) => params.paymentMethod === OrderPaymentMethod.CARD)
	expiryDate: Date;

	@IsNumberString()
	@ValidateIf((params) => params.paymentMethod === OrderPaymentMethod.CARD)
	cvv: string;

	@IsString()
	@IsOptional()
	cardName?: string | null;
}
