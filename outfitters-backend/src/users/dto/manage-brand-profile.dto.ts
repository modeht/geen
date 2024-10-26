import {
	IsAlphanumeric,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
} from 'class-validator';

export class ManageBrandProfileDto {
	@IsNumber()
	@IsOptional()
	coverId?: number | null;

	@IsNumber()
	@IsOptional()
	logoId?: number | null;

	@IsString()
	@IsOptional()
	name?: string | null;

	@IsString()
	@IsAlphanumeric()
	@IsOptional()
	brandName?: string | null;

	@IsString()
	@IsOptional()
	storeBio?: string | null;

	@IsUrl()
	@IsOptional()
	website?: string | null;

	@IsBoolean()
	@IsOptional()
	isPublished?: boolean | null;

	@IsNumber()
	@IsOptional()
	shippingCost?: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	preferences?: number[] | null;
}
