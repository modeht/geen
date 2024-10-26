import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/types';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { FindOptionsRelations } from 'typeorm';
import { Paginated } from '../globals/dto/paginated.dto';
import { AffiliationLinksService } from './affiliation-links.service';
import { CreateAffiliationLinkDto } from './dto/create-affiliation-link.dto';
import { FindAffiliationLinkDto } from './dto/find-affiliation-link.dto';
import { AffiliationLinkEntity } from './entities/affiliation-link.entity';
@ApiTags('affiliation-links')
@Controller('affiliation-links')
@UseGuards(AuthGuard)
export class AffiliationLinksController {
	constructor(private readonly affiliationLinksService: AffiliationLinksService) {}

	@Get()
	find(
		@Query() findAffiliationLinkDto: FindAffiliationLinkDto,
		@Query() paginated: Paginated,
	) {
		const { shopperId, productId } = findAffiliationLinkDto;
		return this.affiliationLinksService.findAll({
			where: {
				shopperId,
				productId,
			},
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	findOne(
		@Param('id') id: number,
		@Relations() relations: FindOptionsRelations<AffiliationLinkEntity>,
	) {
		return this.affiliationLinksService.findOne({
			where: {
				id,
			},
			relations,
		});
	}

	@Post()
	@UseGuards(RoleGuard)
	@Roles([Role.Outfitter])
	create(@Body() createAffiliationLinkDto: CreateAffiliationLinkDto) {
		return this.affiliationLinksService.create(createAffiliationLinkDto.productId);
	}
}
