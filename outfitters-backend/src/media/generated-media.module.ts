import { Module } from '@nestjs/common';
import { MediaService } from './generated-media.service'
import { MediaController } from './generated-media.controller'

@Module({
  imports:[],
  controllers:[MediaController],
  providers:[MediaService],
  exports:[MediaService],
})
export class MediaModule {}
