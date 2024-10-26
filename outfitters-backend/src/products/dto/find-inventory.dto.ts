import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum StockStatus {
	Optimal = 'optimal',
	Critical = 'critical',
}
export class FindInventoryDto {
	@IsOptional()
	@IsString()
	keyword: string;

	@ApiProperty({ enum: StockStatus })
	@IsOptional()
	@IsString()
	@IsEnum(StockStatus)
	status: StockStatus;
}
