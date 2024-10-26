import { IsBoolean } from 'class-validator';

export class AdminUpdateCollectionDto {
	@IsBoolean()
	isFeatured: boolean;
}
