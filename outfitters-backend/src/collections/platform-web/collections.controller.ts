import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthContext } from 'src/auth/auth.context';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { QueryableRelations } from '../../globals/lib/type-helpers';
import { CollectionsService } from '../collections.service';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { collectionQueryableRelations } from '../dto/find-collections.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';

@ApiTags('Web/Brands/Collections')
@Controller('web/brands/collections')
export class WebCollectionsController {
	constructor(
		private readonly collectionsService: CollectionsService,
		private readonly authContext: AuthContext,
	) {}

	@Post()
	@UseGuards(AuthGuard, RoleGuard)
	@Roles([Role.Brand])
	create(@Body() createCollectionDto: CreateCollectionDto) {
		return this.collectionsService.create(createCollectionDto);
	}

	@Put(':id')
	@UseGuards(AuthGuard, RoleGuard)
	@Roles([Role.Brand])
	update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
		return this.collectionsService.update(+id, updateCollectionDto);
	}

	@Get()
	@UseGuards(AuthGuard)
	@Roles([Role.Brand])
	findAll(
		@Query() paginated: Paginated,
		@Relations(collectionQueryableRelations)
		relations: QueryableRelations<typeof collectionQueryableRelations>,
	) {
		const brandId = this.authContext.getUser()!.sub;
		return this.collectionsService.findAll({
			take: +paginated.limit,
			skip: +paginated.limit * +paginated.page,
			where: {
				brandId,
			},
			relations,
		});
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	findOne(
		@Param('id') id: string,
		@Relations(collectionQueryableRelations)
		relations: QueryableRelations<typeof collectionQueryableRelations>,
	) {
		const brandId = this.authContext.getUser()!.sub;
		return this.collectionsService.findOne({
			where: {
				brandId,
				id: +id,
			},
			relations,
		});
	}

	@Delete(':id')
	@UseGuards(AuthGuard, RoleGuard)
	@Roles([Role.Brand])
	remove(@Param('id') id: string) {
		return this.collectionsService.remove(+id);
	}
}
