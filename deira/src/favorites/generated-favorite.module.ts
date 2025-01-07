import { Module } from '@nestjs/common';
import { FavoriteService } from './generated-favorite.service';
import { FavoriteController } from './generated-favorite.controller';

@Module({
	imports: [],
	controllers: [FavoriteController],
	providers: [FavoriteService],
	exports: [FavoriteService],
})
export class FavoriteModule {}
