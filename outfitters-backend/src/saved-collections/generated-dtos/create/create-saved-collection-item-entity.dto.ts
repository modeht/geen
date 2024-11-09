import { IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AddSavedCollectionItemEntitySavedCollectionEntityDto } from '../../generated-dtos/create/create-saved-collection-item-entity-saved-collection-entity.dto';
import { AddSavedCollectionItemEntityProductEntityDto } from '../../../products/generated-dtos/create/create-saved-collection-item-entity-product-entity.dto';
import { AddSavedCollectionItemEntityPostEntityDto } from '../../../posts/generated-dtos/create/create-saved-collection-item-entity-post-entity.dto';
import { PostEntity } from '../../../posts/entities/post.entity'
import { ProductEntity } from '../../../products/entities/product.entity'
import { SavedCollectionEntity } from '../../entities/saved-collection.entity'



export class AddSavedCollectionItemEntityDto {
@IsOptional()
@Relation({entity:'SavedCollectionEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddSavedCollectionItemEntitySavedCollectionEntityDto)
savedCollection?: AddSavedCollectionItemEntitySavedCollectionEntityDto| null;

@IsOptional()
@Relation({entity:'ProductEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddSavedCollectionItemEntityProductEntityDto)
product?: AddSavedCollectionItemEntityProductEntityDto| null;

@IsOptional()
@Relation({entity:'PostEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddSavedCollectionItemEntityPostEntityDto)
post?: AddSavedCollectionItemEntityPostEntityDto| null;

@IsNumber()
savedCollectionId: number;

@IsNumber()
productId: number;

@IsNumber()
postId: number;

@IsNumber()
userId: number;
}
