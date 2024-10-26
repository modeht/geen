import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@MinLength(1)
	name: string;

	@ApiProperty({
		description:
			'The sub-categories of the category, if this category has sub-categories.',
		required: false,
	})
	@IsOptional()
	@IsString({ each: true })
	subCategories: string[] | null;

	@ApiProperty({
		description:
			'The super category of the category, if this category is a sub-category of another category.',
		required: false,
		type: 'number',
	})
	@IsNumber()
	@IsOptional()
	superCategoryId: number;

	@IsNumber()
	@IsOptional()
	mediaId: number;
}
