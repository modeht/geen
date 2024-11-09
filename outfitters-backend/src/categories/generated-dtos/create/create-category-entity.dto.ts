import { ProductEntity } from 'src/products/entities/product.entity';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import {} from 'class-transformer';
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity';
import { BrandProfileEntity } from '../../../users/entities/brand-profile.entity';
import { SeasonalPromotionEntity } from '../../../promotions/entities/seasonal-promotion.entity';

export class AddCategoryEntityDto {
	@IsString()
	name: string;

	@IsBoolean()
	isArchived: boolean;

	@IsNumber()
	@IsOptional()
	superCategoryId?: number | null;
}
