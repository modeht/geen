import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import {
	IsString,
	IsOptional,
	IsBoolean,
	ValidateNested,
	IsArray,
	IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddCollectionEntityMediaEntityDto } from '../../media/generated-dtos/add-collection-entity-media-entity.dto';
import { AddCollectionEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-collection-entity-brand-profile-entity.dto';
import { AddCollectionEntityProductEntityDto } from '../../products/generated-dtos/add-collection-entity-product-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class AddCollectionEntityDto {
	@IsString()
	@IsOptional()
	name?: string | null;

	@IsBoolean()
	isFeatured: boolean;

	@IsBoolean()
	isPublic: boolean;

	@IsOptional()
	@Relation({ entity: 'MediaEntity', type: 'hasOne' })
	@ValidateNested()
	@Type(() => AddCollectionEntityMediaEntityDto)
	cover?: AddCollectionEntityMediaEntityDto | null;

	@IsOptional()
	@Relation({ entity: 'BrandProfileEntity', type: 'belongsToOne' })
	@ValidateNested()
	@Type(() => AddCollectionEntityBrandProfileEntityDto)
	brand?: AddCollectionEntityBrandProfileEntityDto | null;

	@IsOptional()
	@ValidateNested({ each: true })
	@IsArray()
	@Type(() => AddCollectionEntityProductEntityDto)
	products?: AddCollectionEntityProductEntityDto[] | null;

	@IsNumber()
	@IsOptional()
	brandId?: number | null;
}
