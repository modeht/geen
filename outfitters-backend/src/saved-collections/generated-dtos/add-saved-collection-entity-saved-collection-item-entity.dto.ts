import { IsNumber, IsOptional } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { PostEntity } from '../../posts/entities/post.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { SavedCollectionEntity } from '../entities/saved-collection.entity'



export class AddSavedCollectionEntitySavedCollectionItemEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
savedCollectionId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
productId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
postId?: number| null;

@IsNumber()
@IsOptionalIf((obj,_)=>!!obj.id)
userId?: number| null;
}
