import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { OutfittersService } from '../services/outfitters.service';

@ApiTags('Outfitters')
@Controller('outfitters')
@UseGuards(AuthGuard, RoleGuard)
export class OutfittersController {
	constructor(private readonly outfittersService: OutfittersService) {}

	@Get()
	@Roles([Role.Brand])
	findAll(@Query() paginated: Paginated) {
		return this.outfittersService.findAll(paginated);
	}

	@Get('suggested')
	@Roles([Role.Brand])
	findSuggested(@Query() paginated: Paginated) {
		return this.outfittersService.findSuggestions(paginated);
	}
}
