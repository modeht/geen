import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';

export class CreateProductVariantDto {
	@IsNumber()
	@Min(0)
	stock: number;

	@IsNumber()
	@Min(0)
	price: number;

	@IsString()
	@IsOptional()
	sku: string;

	@IsNumber({}, { each: true })
	@IsOptional()
	mediaIds: number[] | null;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => CreateProductVariantAttributesDto)
	attributes: CreateProductVariantAttributesDto[];
}

export class CreateProductVariantAttributesDto {
	@ApiProperty({
		type: 'string',
		required: true,
		description: 'The name of the attribute. (e.g. color, size, etc.)',
	})
	@IsString()
	@Transform(({ value }) => value.toLowerCase())
	attributeName: string;

	@ApiProperty({
		type: 'string',
		required: false,
		description: 'The value of the attribute. (e.g. red, large, etc.)',
	})
	@IsString()
	@IsOptional()
	@Transform(({ value }) => value?.toLowerCase() ?? null)
	attributeValue?: string;
}
