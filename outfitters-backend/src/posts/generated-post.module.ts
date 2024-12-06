import { Module } from '@nestjs/common';
import { PostService } from './generated-post.service';
import { PostController } from './generated-post.controller';

@Module({
	imports: [],
	controllers: [PostController],
	providers: [PostService],
	exports: [PostService],
})
export class PostModule {}
