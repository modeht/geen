import {
	IsNumber,
	IsString,
	MinLength,
	MaxLength,
	IsEnum,
	IsOptional,
	ValidateIf,
	Min,
	ArrayMinSize,
	Max,
	IsArray,
	IsInt,
	IsPositive,
	IsDate,
} from 'class-validator';
import {
	IsEndDateAfterStartDate,
	IsEndDateAfterToday,
} from '../decorators/dateValidation.decorator';
import { Type } from 'class-transformer';
import {
	PromotionStatusEnum,
	PromotionTargetEnum,
	PromotionTypeEnum,
} from '../entities/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromotionDto {
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	title: string;

	@IsOptional()
	@IsEnum(PromotionTypeEnum)
	type: PromotionTypeEnum;

	@IsOptional()
	@IsNumber()
	minPurchaseAmount: number;

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

	@IsEnum(PromotionTargetEnum)
	target: PromotionTargetEnum;

	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@IsNumber()
	@Min(1)
	@Max(100)
	@ValidateIf((e) => e.type == PromotionTypeEnum.Discount)
	discountPercentage: number;

	@ApiProperty({
		description:
			'If this is provided, the promotion will be applied to all products in the array, even if they are not inside categoryIds or subCategoryIds',
	})
	@ValidateIf((o) => !o.categoryIds && !o.subCategoryIds)
	@IsArray()
	@ArrayMinSize(1, { message: 'Array must contain at least 1 ID' })
	@IsInt({ each: true })
	@IsPositive({ each: true })
	productIds: number[];

	@ApiProperty({
		description:
			'If this is provided, the promotion will be applied to all products in the Category, even if they are not inside productIds',
	})
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	categoryIds: number[];

	@ApiProperty({
		description:
			'If this is provided, the promotion will be applied to all products in the subcategories, even if they are not inside categoryIds or productIds',
	})
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	subCategoryIds: number[];
}
