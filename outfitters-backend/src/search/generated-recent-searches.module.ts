import { Module } from '@nestjs/common';
import { RecentSearchesService } from './generated-recent-searches.service'
import { RecentSearchesController } from './generated-recent-searches.controller'

@Module({
  imports:[],
  controllers:[RecentSearchesController],
  providers:[RecentSearchesService],
  exports:[RecentSearchesService],
})
export class RecentSearchesModule {}
