import { IsNumber, IsOptional, IsBoolean, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { MediaEntity } from '../../../media/entities/media.entity'
import { OrderItemEntity } from '../../../orders/entities/order-item.entity'
import { ProductOptionValueEntity } from '../../entities/product-option-value.entity'
import { ProductEntity } from '../../entities/product.entity'
import { CartItemsEntity } from '../../../carts/entities/cart-item.entity'



export class AddProductOptionValueEntityProductVariantEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsBoolean()
@IsOptionalIf((obj,_)=>!!obj.id)
isArchived?: boolean| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
stock?: number| null;

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

@IsNumber()
@IsOptional()
mainProductId?: number | null;
}
