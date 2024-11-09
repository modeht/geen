import { Controller, Post, Body } from '@nestjs/common';
import { AddRefundEntityDto } from './generated-dtos/create/create-refund-entity.dto'
import { RefundService } from './generated-refund.service'

@Controller('refund')
export class RefundController {
  
  constructor(private service: RefundService){}
  
			@Post()
			async create(@Body() body: AddRefundEntityDto){
				return this.service.createRow(body);
			}
		
}
