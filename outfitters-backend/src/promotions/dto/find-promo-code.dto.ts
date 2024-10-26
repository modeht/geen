import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PromotionStatusEnum } from '../entities/enums';
import { Transform } from 'class-transformer';

export class FindPromoCodeDto {
	@IsOptional()
	@IsString()
	keyword: string;

	@ApiProperty({
		enum: PromotionStatusEnum,
		required: false,
		description: Object.values(PromotionStatusEnum).join(', '),
	})
	@IsOptional()
	@IsEnum(PromotionStatusEnum)
	status: PromotionStatusEnum;
}

export class AdminFindPromoCodeDto extends FindPromoCodeDto {
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
	outfitterId?: number[];
}
