import { UserEntity } from 'src/users/entities/user.entity';
import { IsNumber, IsOptional, IsString } from "class-validator";
import {  } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AffiliationLinkEntity } from '../entities/affiliation-link.entity'



export class AddAffiliationLinkEntityAffiliationLinkTrackingEntityDto {
@IsNumber()
@IsOptional()
id?: number| null;

@IsString()
@IsOptional()
referrer?: string | null;

@IsString()
@IsOptionalIf((obj,_)=>!!obj.id)
country?: string| null;

@IsString()
@IsOptional()
ipAddress?: string | null;

@IsString()
@IsOptional()
userAgent?: string | null;
}
