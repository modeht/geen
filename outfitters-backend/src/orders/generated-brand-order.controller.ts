import { Controller, Post, Body } from '@nestjs/common';
import { CreateBrandOrderEntityDto } from './generated-dtos/create/create-brand-order-entity.dto'
import { BrandOrderService } from './generated-brand-order.service'

@Controller('brand-order')
export class BrandOrderController {
  
  constructor(private service: BrandOrderService){}
  
			@Post()
			async create(@Body() body: CreateBrandOrderEntityDto){
				return this.service.createRow(body);
			}
		
}
