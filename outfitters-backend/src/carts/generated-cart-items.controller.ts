import { Controller, Post, Body } from '@nestjs/common';
import { AddCartItemsEntityDto } from './generated-dtos/add-cart-items-entity.dto'
import { CartItemsService } from './generated-cart-items.service'

@Controller('cart-items')
export class CartItemsController {
  
  constructor(private service: CartItemsService){}
  
			@Post()
			async create(@Body() body: AddCartItemsEntityDto){
				return this.service.createRow(body);
			}
		
}
