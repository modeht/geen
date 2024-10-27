import { Controller, Post, Body } from '@nestjs/common';
import { AddOrderItemEntityDto } from './generated-dtos/add-order-item-entity.dto'
import { OrderItemService } from './generated-order-item.service'

@Controller('order-item')
export class OrderItemController {
  
  constructor(private service: OrderItemService){}
  
			@Post()
			async create(@Body() body: AddOrderItemEntityDto){
				return this.service.createRow(body);
			}
		
}
