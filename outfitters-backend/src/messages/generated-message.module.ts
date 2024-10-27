import { Module } from '@nestjs/common';
import { MessageService } from './generated-message.service'
import { MessageController } from './generated-message.controller'

@Module({
  imports:[],
  controllers:[MessageController],
  providers:[MessageService],
  exports:[MessageService],
})
export class MessageModule {}
