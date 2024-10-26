import { IsEnum } from 'class-validator';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
	@ApiProperty({
		enum: OrderStatusEnum,
		required: true,
		example: OrderStatusEnum.OutForDelivery,
		description: Object.values(OrderStatusEnum).join(', '),
	})
	@IsEnum(OrderStatusEnum)
	status: OrderStatusEnum;
}
