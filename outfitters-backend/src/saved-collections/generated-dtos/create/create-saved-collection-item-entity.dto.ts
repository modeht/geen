import { IsNumber } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { PostEntity } from '../../../posts/entities/post.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { SavedCollectionEntity } from '../../entities/saved-collection.entity'



export class CreateSavedCollectionItemEntityDto {
@IsNumber()
savedCollectionId: number;

@IsNumber()
productId: number;

@IsNumber()
postId: number;

@IsNumber()
userId: number;
}
