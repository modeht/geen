import { IsOptional, IsString } from 'class-validator';

export class FindBrandDto {
	@IsOptional()
	@IsString()
	keyword?: string;
}
