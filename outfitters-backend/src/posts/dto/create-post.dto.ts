import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
	@IsOptional()
	@IsString()
	caption: string;

	@IsNumber({}, { each: true })
	media: number[];

	@IsOptional()
	@IsNumber()
	thumbnailId: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	taggedUsersIds?: number[] | null;

	@IsOptional()
	@IsArray()
	@Type(() => CreateTaggedProductDto)
	taggedProducts?: CreateTaggedProductDto[] | null;
}

export class CreateTaggedProductDto {
	@IsNumber()
	productId: number;

	@IsOptional()
	@IsNumber()
	affiliationLinkId: number;
}
