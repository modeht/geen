import { Module } from '@nestjs/common';
import { CollaborationService } from './generated-collaboration.service'
import { CollaborationController } from './generated-collaboration.controller'

@Module({
  imports:[],
  controllers:[CollaborationController],
  providers:[CollaborationService],
  exports:[CollaborationService],
})
export class CollaborationModule {}
