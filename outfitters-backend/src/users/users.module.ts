import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminUsersController } from './controllers/admin-users.controller';
import { BrandsController } from './controllers/brands.controller';
import { OutfittersController } from './controllers/outfitters.controller';
import { ShoppersController } from './controllers/shoppers.controller';
import { UsersRelationShipsController } from './controllers/users-relationships.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsService } from './services/brands.service';
import { OutfittersService } from './services/outfitters.service';
import { ShoppersService } from './services/shoppers.service';
import { UsersRelationshipsService } from './services/users-relationships.service';
import { UsersService } from './services/users.service';

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [
		UsersController,
		ShoppersController,
		BrandsController,
		OutfittersController,
		UsersRelationShipsController,
		AdminUsersController,
	],
	providers: [
		UsersService,
		ShoppersService,
		BrandsService,
		OutfittersService,
		UsersRelationshipsService,
	],
	exports: [UsersService, OutfittersService],
})
export class UsersModule {}
