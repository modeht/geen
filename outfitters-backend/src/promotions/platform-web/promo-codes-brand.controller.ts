import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Roles } from '../../auth/decorators/role.decorator';
import { CreatePromoCodeDto } from '../dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from '../dto/update-promo-code.dto';
import { FindPromoCodeDto } from '../dto/find-promo-code.dto';
import { Paginated } from '../../globals/dto/paginated.dto';
import { AuthContext } from '../../auth/auth.context';
import { ILike } from 'typeorm';
import { PromoCodesService } from '../services/promo-codes.service';

@ApiTags('Web/Brands/Promo-Codes')
@Controller('web/brands/promo-codes')
@UseGuards(AuthGuard, RoleGuard)
export class PromoCodesBrandController {
	constructor(
		private readonly promoCodesService: PromoCodesService,
		private readonly authContext: AuthContext,
	) {}

	@Post()
	@Roles([Role.Brand])
	async create(@Body() createPromoCodeDto: CreatePromoCodeDto) {
		return this.promoCodesService.create(createPromoCodeDto);
	}

	@Patch(':id')
	@Roles([Role.Brand])
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePromoCodeDto: UpdatePromoCodeDto,
	) {
		return this.promoCodesService.update(id, updatePromoCodeDto);
	}

	@Get()
	@Roles([Role.Brand])
	async findAll(
		@Query() findPromoCodeDto: FindPromoCodeDto,
		@Query() paginated: Paginated,
	) {
		const brandId = this.authContext.getUser().sub;
		const baseConditions = { brandId, status: findPromoCodeDto.status };

		return this.promoCodesService.findAll({
			where: [
				{ ...baseConditions, title: ILike(`%${findPromoCodeDto.keyword ?? ''}%`) },
				{ ...baseConditions, code: ILike(`%${findPromoCodeDto.keyword ?? ''}%`) },
				{
					...baseConditions,
					shopperProfile: [
						{ username: ILike(`%${findPromoCodeDto.keyword ?? ''}%`) },
						{ fullName: ILike(`%${findPromoCodeDto.keyword ?? ''}%`) },
					],
				},
			],
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			relations: { shopperProfile: { profilePicture: true } },
		});
	}

	@Get(':id')
	@Roles([Role.Brand])
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const brandId = this.authContext.getUser().sub;
		return this.promoCodesService.findOne({ id, brandId });
	}

	@Delete(':id')
	@Roles([Role.Brand])
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.promoCodesService.remove(id);
	}
}
