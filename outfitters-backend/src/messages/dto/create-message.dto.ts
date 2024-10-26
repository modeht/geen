import { ApiHideProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { CollaborationEntity } from 'src/collaborations/entities/collaboration.entity';

export class CreateMessageDto {
	@IsNumber()
	@ValidateIf((o) => !o.support)
	recipientId: number;

	@IsBoolean()
	@IsOptional()
	support?: boolean;

	@IsString()
	@ValidateIf(
		(o) => !o.mediaIds?.length && !o.postId && !o.storyId && !o.commentId && !o.productId,
	)
	content: string;

	@IsNumber({}, { each: true })
	@IsOptional()
	mediaIds?: number[];

	@IsNumber()
	@IsOptional()
	postId?: number;

	@IsNumber()
	@IsOptional()
	storyId?: number;

	@IsNumber()
	@IsOptional()
	commentId?: number;

	@IsNumber()
	@IsOptional()
	productId?: number;

	@ApiHideProperty()
	collaboration?: CollaborationEntity;
}
