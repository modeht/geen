import { IsBoolean } from 'class-validator';

export class SetLikeDto {
	@IsBoolean()
	isLiked: boolean;
}
