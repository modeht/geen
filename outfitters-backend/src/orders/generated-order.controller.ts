import { Controller, Post, Body } from '@nestjs/common';
import { AddOrderEntityDto } from './generated-dtos/add-order-entity.dto'
import { OrderService } from './generated-order.service'

@Controller('order')
export class OrderController {
  
  constructor(private service: OrderService){}
  
			@Post()
			async create(@Body() body: AddOrderEntityDto){
				return this.service.createRow(body);
			}
		
}
