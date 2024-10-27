import { Controller, Post, Body } from '@nestjs/common';
import { AddCartEntityDto } from './generated-dtos/add-cart-entity.dto'
import { CartService } from './generated-cart.service'

@Controller('cart')
export class CartController {
  
  constructor(private service: CartService){}
  
			@Post()
			async create(@Body() body: AddCartEntityDto){
				return this.service.createRow(body);
			}
		
}
