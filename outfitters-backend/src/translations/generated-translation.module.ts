import { Module } from '@nestjs/common';
import { TranslationService } from './generated-translation.service'
import { TranslationController } from './generated-translation.controller'

@Module({
  imports:[],
  controllers:[TranslationController],
  providers:[TranslationService],
  exports:[TranslationService],
})
export class TranslationModule {}
