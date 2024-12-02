import { Module } from '@nestjs/common';
import { OrderItemService } from './generated-order-item.service'
import { OrderItemController } from './generated-order-item.controller'

@Module({
  imports:[],
  controllers:[OrderItemController],
  providers:[OrderItemService],
  exports:[OrderItemService],
})
export class OrderItemModule {}
