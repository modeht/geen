import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { IsOptional, ValidateNested, IsEnum, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { CollaborationStatusEnum } from '../entities/collaboration.entity'
import { AddCollaborationEntityMessageEntityDto } from '../../messages/generated-dtos/add-collaboration-entity-message-entity.dto';
import { AddCollaborationEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-collaboration-entity-brand-profile-entity.dto';
import { AddCollaborationEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-collaboration-entity-shopper-profile-entity.dto';
import { AddCollaborationEntityNotificationEntityDto } from '../../notifications/generated-dtos/add-collaboration-entity-notification-entity.dto';
import { MessageEntity } from '../../messages/entities/message.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'



export class AddCollaborationEntityDto {
@IsOptional()
@Relation({entity:'MessageEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCollaborationEntityMessageEntityDto)
message?: AddCollaborationEntityMessageEntityDto| null;

@IsOptional()
@Relation({entity:'BrandProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCollaborationEntityBrandProfileEntityDto)
brandProfile?: AddCollaborationEntityBrandProfileEntityDto| null;

@IsOptional()
@Relation({entity:'ShopperProfileEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddCollaborationEntityShopperProfileEntityDto)
shopperProfile?: AddCollaborationEntityShopperProfileEntityDto| null;

@IsEnum(CollaborationStatusEnum)
status: CollaborationStatusEnum;

@IsOptional()
@IsOptional()
@Relation({entity:'NotificationEntity',type:'hasMany'})
@ValidateNested({ each: true })
@Type(() => AddCollaborationEntityNotificationEntityDto)
notifications?: AddCollaborationEntityNotificationEntityDto[] | null;

@IsNumber()
@IsOptional()
brandId?: number | null;

@IsNumber()
@IsOptional()
shopperId?: number | null;
}
