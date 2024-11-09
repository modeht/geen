import { ProductEntity } from 'src/products/entities/product.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';
import {} from 'class-transformer';
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { ShopperProfileEntity } from '../../../users/entities/shopper-profile.entity';
import { AffiliationLinkTrackingEntity } from '../../entities/affiliation-link-tracking.entity';
import { CartItemsEntity } from '../../../carts/entities/cart-item.entity';

export class AddAffiliationLinkEntityDto {
	@IsBoolean()
	isDisabled: boolean;

	@IsString()
	url: string;

	@IsNumber()
	productId: number;

	@IsNumber()
	shopperId: number;
}
