import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { FindBrandDto } from '../dto/find-brand.dto';
import { ManageBrandProfileDto } from '../dto/manage-brand-profile.dto';
import { BrandsService } from '../services/brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
	constructor(private readonly brandsService: BrandsService) {}

	@Put('storefront')
	@UseGuards(AuthGuard, RoleGuard)
	@Roles([Role.Brand])
	updateProfile(@Body() profile: ManageBrandProfileDto) {
		return this.brandsService.manageProfile(profile);
	}

	@Get()
	@UseGuards(AuthGuard)
	findAll(@Query() findBrandDto: FindBrandDto, @Query() paginated: Paginated) {
		const baseConditions = { isPublished: true };
		return this.brandsService.findAll({
			where: [
				{ ...baseConditions, storeName: ILike(`%${findBrandDto.keyword ?? ''}%`) },
				{ ...baseConditions, brandName: ILike(`%${findBrandDto.keyword ?? ''}%`) },
			],
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	findOne(@Param('id') id: string) {
		return this.brandsService.findOne({
			where: {
				isPublished: true,
				id: +id,
			},
			relations: ['preferences'],
		});
	}

	@Get('public')
	findAllPublic() {
		return this.brandsService.findAllPublic();
	}
}
