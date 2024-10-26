import { IsOptional, IsString } from 'class-validator';

export class FindUserDto {
	@IsOptional()
	@IsString()
	keyword?: string;
}
