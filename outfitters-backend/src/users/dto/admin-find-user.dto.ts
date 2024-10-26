import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/types';
import { AccountStatus } from '../entities/user.entity';

export class AdminFindUserDto {
	@IsString()
	@IsOptional()
	keyword?: string;

	@IsDate()
	@Transform((params) => new Date(params.value))
	@IsOptional()
	RegisteredBeforeDate?: Date;

	@IsDate()
	@Transform((params) => new Date(params.value))
	@IsOptional()
	RegisteredAfterDate?: Date;

	@ApiProperty({ enum: AccountStatus, required: false })
	@IsEnum(AccountStatus)
	@IsOptional()
	status?: AccountStatus;

	@ApiProperty({ enum: ['shopper', 'outfitter', 'brand'], required: false })
	@IsEnum(Role)
	@IsOptional()
	role?: Role;

	@IsNumber()
	@IsOptional()
	@Transform((params) => parseInt(params.value))
	categoryId?: number;
}
