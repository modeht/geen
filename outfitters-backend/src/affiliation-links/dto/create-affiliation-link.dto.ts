import { IsNumber } from 'class-validator';

export class CreateAffiliationLinkDto {
	@IsNumber()
	productId: number;
}
