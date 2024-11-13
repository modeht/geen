import { Controller, Post, Body } from '@nestjs/common';
import { CreateCartItemsEntityDto } from './generated-dtos/create/create-cart-items-entity.dto'
import { CartItemsService } from './generated-cart-items.service'

@Controller('cart-items')
export class CartItemsController {
  
  constructor(private service: CartItemsService){}
  
			@Post()
			async create(@Body() body: CreateCartItemsEntityDto){
				return this.service.createRow(body);
			}
		
}
