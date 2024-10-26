import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { PromotionStatusEnum, PromotionTypeEnum } from '../entities/enums';

export class FindPromotionDto {
	@IsOptional()
	@IsString()
	title: string;

	@ApiProperty({
		enum: PromotionTypeEnum,
		required: false,
		description: Object.values(PromotionTypeEnum).join(', '),
	})
	@IsOptional()
	@IsEnum(PromotionTypeEnum)
	type: PromotionTypeEnum;

	@ApiProperty({
		enum: PromotionStatusEnum,
		required: false,
		description: Object.values(PromotionStatusEnum).join(', '),
	})
	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	start: Date;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	end: Date;
}

export class AdminFindPromotionDto {
	@IsOptional()
	@IsString()
	title: string;

	@ApiProperty({
		enum: PromotionStatusEnum,
		required: false,
		description: Object.values(PromotionStatusEnum).join(', '),
	})
	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;

	@IsOptional()
	@Transform(({ value }) => {
		if (Array.isArray(value)) {
			value = value.map(Number);
		} else {
			value = [value];
		}
		value = value.map(Number);
		value = value.filter((val) => !!val);
		return value.length ? value : undefined;
	})
	brandId?: number[];
}
