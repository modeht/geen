import { Transform } from 'class-transformer';
import {
	ArrayMinSize,
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	MinLength,
} from 'class-validator';
import { GenderEnum } from '../entities/shopper-profile.entity';

export class UpdateShopperProfileDto {
	@IsString()
	@MinLength(1)
	@IsOptional()
	username?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	fullName?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	bio?: string | null;

	@IsEnum(GenderEnum)
	@IsOptional()
	gender?: GenderEnum | null;

	@IsUrl()
	@MinLength(1)
	@IsOptional()
	instagramProfileLink?: string | null;

	@IsUrl()
	@MinLength(1)
	@IsOptional()
	facebookProfileLink?: string | null;

	@IsUrl()
	@MinLength(1)
	@IsOptional()
	tiktokProfileLink?: string | null;

	@IsString()
	@IsOptional()
	@MinLength(1)
	country?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	city?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	apartment?: string | null;

	@IsString()
	@MinLength(1)
	@IsOptional()
	street?: string | null;

	@IsDate()
	@Transform((params) => new Date(params.value))
	@IsOptional()
	dateOfBirth?: Date | null;

	@IsNumber()
	@IsOptional()
	mediaId?: number | null;

	@IsNumber({}, { each: true })
	@ArrayMinSize(1)
	@IsOptional()
	preferencesIds?: number[] | null;
}
