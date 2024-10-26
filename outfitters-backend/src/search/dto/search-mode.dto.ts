import { IsEnum } from 'class-validator';
import { searchMode } from '../entities/recent-searches.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SearchModeDto {
	@ApiProperty({
		enum: searchMode,
		description: Object.values(searchMode).join(', '),
	})
	@IsEnum(searchMode)
	mode: searchMode;
}
