import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsString, MaxLength, IsOptional } from 'class-validator';

export class RateOrderDto {
	@ApiProperty({
		required: true,
		example: 4.5,
		description: 'Rating of the order',
	})
	@IsNumber()
	@Min(0)
	@Max(5)
	rating: number;

	@ApiProperty({
		required: false,
		example: 'Great service',
		description: 'Review of the order',
	})
	@IsString()
	@MaxLength(255)
	@IsOptional()
	review: string;
}
