import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAffiliationLinkDto {
	@IsNumber()
	@Type(() => Number)
	shopperId: number;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	productId: number;
}
