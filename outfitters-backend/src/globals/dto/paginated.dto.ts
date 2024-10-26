import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Paginated {
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	page?: number = 0;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Max(50)
	limit?: number = 25;
}
