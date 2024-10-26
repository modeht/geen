import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { IsNumber, IsOptional, IsEnum } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { CollaborationStatusEnum } from '../entities/collaboration.entity'
import { MessageEntity } from '../../messages/entities/message.entity'
import { ProductEntity } from '../../products/entities/product.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'



export class AddMessageEntityCollaborationEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsNumber()
@IsOptional()
brandId?: number | null;

@IsNumber()
@IsOptional()
shopperId?: number | null;
}
