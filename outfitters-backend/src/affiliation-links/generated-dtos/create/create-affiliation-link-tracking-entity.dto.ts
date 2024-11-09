import { UserEntity } from 'src/users/entities/user.entity';
import { IsString, IsOptional } from 'class-validator';
import {} from 'class-transformer';
import { Relation } from '../../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../../globals/validators/is-option-if.validator';
import { AffiliationLinkEntity } from '../../entities/affiliation-link.entity';

export class AddAffiliationLinkTrackingEntityDto {
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
