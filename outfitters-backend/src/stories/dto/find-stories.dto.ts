import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindStoriesDto {
	@ApiProperty({
		description:
			'The ID of the user who posted the story, can be used to get a specific user stories',
		required: false,
		type: Number,
	})
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	postedById?: number;
}
