import { UserEntity } from 'src/users/entities/user.entity';
import { IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddAffiliationLinkTrackingEntityAffiliationLinkEntityDto } from '../generated-dtos/add-affiliation-link-tracking-entity-affiliation-link-entity.dto';
import { AddAffiliationLinkTrackingEntityUserEntityDto } from '../../users/generated-dtos/add-affiliation-link-tracking-entity-user-entity.dto';
import { AffiliationLinkEntity } from '../entities/affiliation-link.entity'



export class AddAffiliationLinkTrackingEntityDto {
@IsOptional()
@Relation({entity:'AffiliationLinkEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddAffiliationLinkTrackingEntityAffiliationLinkEntityDto)
affiliationLink?: AddAffiliationLinkTrackingEntityAffiliationLinkEntityDto| null;

@IsOptional()
@Relation({entity:'UserEntity',type:'belongsToOne'})
@ValidateNested()
@Type(() => AddAffiliationLinkTrackingEntityUserEntityDto)
user?: AddAffiliationLinkTrackingEntityUserEntityDto| null;

@IsString()
@IsOptional()
referrer?: string | null;

@IsString()
country: string;

@IsString()
@IsOptional()
ipAddress?: string | null;

@IsString()
@IsOptional()
userAgent?: string | null;
}
