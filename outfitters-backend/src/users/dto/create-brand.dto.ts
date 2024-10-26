import {
	IsAlphanumeric,
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
} from 'class-validator';

export class CreateBrandDto {
	@IsEmail({}, { message: 'Please enter a valid email.' })
	email: string;

	@IsString()
	storeName: string;

	@IsString()
	@IsAlphanumeric()
	brandName: string;

	@IsUrl()
	@IsOptional()
	website?: string | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	countriesIds: number[] | null;

	@IsString()
	currency?: string | null;

	@IsString()
	@IsOptional()
	storeBio?: string | null;

	@IsNumber()
	@IsOptional()
	logoId?: number | null;

	@IsString()
	brandManagerFullName: string;

	@IsNumber({}, { each: true })
	@IsOptional()
	categoriesIds: number[] | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	subCategoriesIds: number[] | null;

	// TODO: Remove this on production
	@IsBoolean()
	@IsOptional()
	isTest?: boolean;
}
