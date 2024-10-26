import { Body, Controller, Injectable, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/types';
import { CollectionsService } from '../collections.service';
import { AdminUpdateCollectionDto } from '../dto/admin-update-collection.dto';

@Injectable()
@ApiTags('Web/admin/Collections')
@Controller('web/admin/collections')
@UseGuards(AuthGuard, RoleGuard)
export class CollectionsAdminController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Put(':id')
	// @Roles([Role.Admin])
	@Roles(['*'])
	update(@Param('id') id: string, @Body() updateCollectionDto: AdminUpdateCollectionDto) {
		return this.collectionsService.setFeatured(+id, updateCollectionDto.isFeatured);
	}
}
