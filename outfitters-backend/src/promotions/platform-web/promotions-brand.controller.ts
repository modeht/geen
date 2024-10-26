import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	ParseIntPipe,
} from '@nestjs/common';

import { CreatePromotionDto } from '../dto/create-promotion.dto';
import { UpdatePromotionDto } from '../dto/update-promotion.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/types';
import { FindPromotionDto } from '../dto/find-promotion.dto';
import { Paginated } from '../../globals/dto/paginated.dto';
import { AuthContext } from '../../auth/auth.context';
import { ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { PromotionsService } from '../services/promotions.service';

@ApiTags('Web/Brands/Promotions')
@Controller('web/brands/promotions')
@UseGuards(AuthGuard, RoleGuard)
export class PromotionsBrandController {
	constructor(
		private readonly promotionsService: PromotionsService,
		private readonly authContext: AuthContext,
	) {}

	@Post()
	@Roles([Role.Brand])
	create(@Body() createPromotionDto: CreatePromotionDto) {
		return this.promotionsService.create(createPromotionDto);
	}

	@Get()
	@Roles([Role.Brand])
	findAll(@Query() findPromotionDto: FindPromotionDto, @Query() paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		return this.promotionsService.findAll({
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			where: {
				brandId,
				title: ILike(`%${findPromotionDto.title ?? ''}%`),
				type: findPromotionDto.type,
				status: findPromotionDto.status,
				...(findPromotionDto.start && {
					start: MoreThanOrEqual(findPromotionDto.start),
				}),
				...(findPromotionDto.end && {
					end: LessThanOrEqual(findPromotionDto.end),
				}),
			},
		});
	}

	@Get(':id')
	@Roles([Role.Brand])
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.promotionsService.findOne(id);
	}

	@Patch(':id')
	@Roles([Role.Brand])
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePromotionDto: UpdatePromotionDto,
	) {
		return this.promotionsService.update(id, updatePromotionDto);
	}

	@Delete(':id')
	@Roles([Role.Brand])
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.promotionsService.remove(id);
	}
}
