import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { AbstractService } from './AbstractService';

@Module({
	controllers: [MediaController],
	providers: [MediaService, AbstractService],
	exports: [MediaService],
})
export class MediaModule {}
