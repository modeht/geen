import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPaymentMethod } from '../entities/order.entity';

export class BrandFindOrderDto {
	@IsOptional()
	keyword?: string;

	@ApiProperty({
		type: 'enum',
		enum: OrderStatusEnum,
		required: false,
		description: Object.values(OrderStatusEnum).join(', '),
	})
	@IsOptional()
	@IsEnum(OrderStatusEnum)
	status?: OrderStatusEnum;

	@ApiProperty({
		type: 'enum',
		enum: OrderPaymentMethod,

		required: false,
		description: Object.values(OrderPaymentMethod).join(', '),
	})
	@IsOptional()
	@IsEnum(OrderPaymentMethod)
	paymentMethod?: OrderPaymentMethod;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	placedAfter?: Date;
}
export class AdminFindOrderDto extends BrandFindOrderDto {
	@IsOptional()
	@Transform(({ value }) => {
		if (Array.isArray(value)) {
			value = value.map(Number);
		} else {
			value = [value];
		}
		value = value.map(Number);
		value = value.filter((val) => !!val);
		return value.length ? value : undefined;
	})
	brandId?: number[];
}
