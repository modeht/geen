import { PartialType } from '@nestjs/swagger';
import { CreateAffiliationLinkDto } from './create-affiliation-link.dto';

export class UpdateAffiliationLinkDto extends PartialType(CreateAffiliationLinkDto) {}
