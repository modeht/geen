import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthContext } from 'src/auth/auth.context';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/types';
import { Paginated } from '../globals/dto/paginated.dto';
import { CollaborationsService } from './collaborations.service';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationStatusDto } from './dto/update-collaboration-status.dto';
import { FindCollaborationDto } from './dto/find-collaboration.dto';

@ApiTags('collaborations')
@Controller('collaborations')
@UseGuards(AuthGuard, RoleGuard)
export class CollaborationsController {
	constructor(
		private readonly collaborationsService: CollaborationsService,
		private readonly authContext: AuthContext,
	) {}

	@Post()
	@Roles([Role.Brand])
	create(@Body() createCollaborationDto: CreateCollaborationDto) {
		return this.collaborationsService.create(createCollaborationDto);
	}

	@Get()
	@Roles([Role.Brand, Role.Outfitter])
	findMyCollaborations(
		@Query() findCollaborationDto: FindCollaborationDto,
		@Query() paginated: Paginated,
	) {
		const userId = this.authContext.getUser()!.sub;
		return this.collaborationsService.findAll({
			where: [
				{ shopperId: userId, status: findCollaborationDto.status },
				{ brandId: userId, status: findCollaborationDto.status },
			],
			relations: { brandProfile: true, shopperProfile: true },
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	@Roles([Role.Brand, Role.Outfitter])
	find(@Param('id', ParseIntPipe) id: number) {
		return this.collaborationsService.findOne(id);
	}

	@Get(':productId/affiliated')
	@Roles([Role.Outfitter])
	isAffiliated(@Param('productId', ParseIntPipe) productId: number) {
		const userId = this.authContext.getUser()!.sub;
		return this.collaborationsService.isProductAffiliated(userId, productId);
	}

	@Patch(':id/status')
	@Roles([Role.Outfitter])
	updateStatus(
		@Param('id') id: string,
		@Body() updateCollaborationStatusDto: UpdateCollaborationStatusDto,
	) {
		return this.collaborationsService.updateStatus(+id, updateCollaborationStatusDto);
	}
}
