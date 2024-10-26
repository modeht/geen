import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTaggedProductDto } from 'src/posts/dto/create-post.dto';

export class CreateStoryDto {
	@IsString()
	@IsOptional()
	background?: string;

	@IsString()
	@IsOptional()
	text?: string;

	@IsNumber()
	mediaId: number;

	@IsNumber({}, { each: true })
	@IsOptional()
	taggedUsersIds?: number[] | null;

	@IsOptional()
	@IsArray()
	@Type(() => CreateTaggedProductDto)
	taggedProducts?: CreateTaggedProductDto[] | null;
}
