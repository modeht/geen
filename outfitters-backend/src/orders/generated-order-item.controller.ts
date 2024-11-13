import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderItemEntityDto } from './generated-dtos/create/create-order-item-entity.dto'
import { OrderItemService } from './generated-order-item.service'

@Controller('order-item')
export class OrderItemController {
  
  constructor(private service: OrderItemService){}
  
			@Post()
			async create(@Body() body: CreateOrderItemEntityDto){
				return this.service.createRow(body);
			}
		
}
