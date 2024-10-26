import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { AccountStatus } from '../entities/user.entity';

export class AdminUpdateUserDto {
	@IsBoolean()
	@IsOptional()
	isOutfitter: boolean;

	@ApiProperty({
		enum: AccountStatus,
		description: Object.values(AccountStatus).join(', '),
	})
	@IsEnum(AccountStatus)
	@IsOptional()
	status: AccountStatus;
}
