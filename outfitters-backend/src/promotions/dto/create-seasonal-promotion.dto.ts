import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsDate,
	IsEnum,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';
import {
	IsEndDateAfterToday,
	IsEndDateAfterStartDate,
} from '../decorators/dateValidation.decorator';
import { PromotionStatusEnum } from '../entities/enums';

export class CreateSeasonalPromotionDto {
	@IsString()
	title: string;

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

	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@ArrayMinSize(1)
	subCategoryIds: number[];
}
