import { Controller, Post, Body } from '@nestjs/common';
import { AddBrandOrderEntityDto } from './generated-dtos/add-brand-order-entity.dto'
import { BrandOrderService } from './generated-brand-order.service'

@Controller('brand-order')
export class BrandOrderController {
  
  constructor(private service: BrandOrderService){}
  
			@Post()
			async create(@Body() body: AddBrandOrderEntityDto){
				return this.service.createRow(body);
			}
		
}
