import {
	ArrayMinSize,
	IsArray,
	IsDate,
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
	ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
	IsEndDateAfterToday,
	IsEndDateAfterStartDate,
} from '../decorators/dateValidation.decorator';
import { PromotionStatusEnum, PromotionTypeEnum } from '../entities/enums';

export class CreatePromoCodeDto {
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	title: string;

	@IsOptional()
	@IsNumber()
	minPurchaseAmount: number;

	@IsOptional()
	@IsNumber()
	perUserLimit: number;

	@IsOptional()
	@IsNumber()
	totalLimit: number;

	@IsDate()
	@Type(() => Date)
	start: Date;

	@IsDate()
	@Type(() => Date)
	@IsEndDateAfterToday()
	@IsEndDateAfterStartDate('start', {
		message: 'The end date must be after the start date.',
	})
	end: Date;

	@IsNumber()
	@Min(0)
	@Max(100)
	@ValidateIf((o) => o.type === PromotionTypeEnum.Discount)
	discountPercentage: number;

	@IsOptional()
	@IsEnum(PromotionTypeEnum)
	type: PromotionTypeEnum;

	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
	@IsPositive()
	outfitterId: number;

	@ValidateIf((o) => !o.categoryIds && !o.subCategoryIds)
	@IsArray()
	@ArrayMinSize(1, { message: 'Array must contain at least 1 ID' })
	@IsInt({ each: true })
	@IsPositive({ each: true })
	productIds: number[];

	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	categoryIds: number[];

	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	subCategoryIds: number[];
}
