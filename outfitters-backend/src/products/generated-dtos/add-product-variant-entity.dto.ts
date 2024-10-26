import { IsBoolean, IsNumber, IsOptional, IsDate, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddProductVariantEntityMediaEntityDto } from '../../media/generated-dtos/add-product-variant-entity-media-entity.dto';
import { AddProductVariantEntityOrderItemEntityDto } from '../../orders/generated-dtos/add-product-variant-entity-order-item-entity.dto';
import { AddProductVariantEntityCartItemsEntityDto } from '../../carts/generated-dtos/add-product-variant-entity-cart-items-entity.dto';
import { AddProductVariantEntityProductEntityDto } from '../generated-dtos/add-product-variant-entity-product-entity.dto';
import { AddProductVariantEntityProductOptionValueEntityDto } from '../generated-dtos/add-product-variant-entity-product-option-value-entity.dto';
import { MediaEntity } from '../../media/entities/media.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { ProductOptionValueEntity } from '../entities/product-option-value.entity'
import { ProductEntity } from '../entities/product.entity'
import { CartItemsEntity } from '../../carts/entities/cart-item.entity'



export class AddProductVariantEntityDto {
@IsBoolean()
isArchived: boolean;

@IsNumber()
stock: number;

@IsNumber()
@IsOptional()
price?: number | null;

@IsDate()
@Type(()=>Date)
@IsOptional()
lastStockUpdate?: Date | null;

@IsString()
@IsOptional()
sku?: string | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductVariantEntityMediaEntityDto)
media?: AddProductVariantEntityMediaEntityDto[] | null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductVariantEntityOrderItemEntityDto)
orderItems?: AddProductVariantEntityOrderItemEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductVariantEntityCartItemsEntityDto)
carts?: AddProductVariantEntityCartItemsEntityDto[]| null;

@IsOptional()
@ValidateNested()
@Type(() => AddProductVariantEntityProductEntityDto)
mainProduct?: AddProductVariantEntityProductEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddProductVariantEntityProductOptionValueEntityDto)
optionValues?: AddProductVariantEntityProductOptionValueEntityDto[]| null;

@IsNumber()
@IsOptional()
mainProductId?: number | null;
}
