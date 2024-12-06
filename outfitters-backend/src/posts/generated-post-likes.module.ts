import { Module } from '@nestjs/common';
import { PostLikesService } from './generated-post-likes.service';
import { PostLikesController } from './generated-post-likes.controller';

@Module({
	imports: [],
	controllers: [PostLikesController],
	providers: [PostLikesService],
	exports: [PostLikesService],
})
export class PostLikesModule {}
