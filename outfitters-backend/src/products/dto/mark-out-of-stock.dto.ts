import { ArrayMinSize, IsNumber } from 'class-validator';

export class MarkOutOfStockDto {
	@IsNumber({}, { each: true })
	@ArrayMinSize(1)
	productIds: number[];
}
