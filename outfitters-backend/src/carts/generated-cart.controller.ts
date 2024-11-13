import { Controller, Post, Body } from '@nestjs/common';
import { CreateCartEntityDto } from './generated-dtos/create/create-cart-entity.dto'
import { CartService } from './generated-cart.service'

@Controller('cart')
export class CartController {
  
  constructor(private service: CartService){}
  
			@Post()
			async create(@Body() body: CreateCartEntityDto){
				return this.service.createRow(body);
			}
		
}
