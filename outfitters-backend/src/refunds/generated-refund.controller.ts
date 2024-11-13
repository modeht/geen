import { Controller, Post, Body } from '@nestjs/common';
import { CreateRefundEntityDto } from './generated-dtos/create/create-refund-entity.dto'
import { RefundService } from './generated-refund.service'

@Controller('refund')
export class RefundController {
  
  constructor(private service: RefundService){}
  
			@Post()
			async create(@Body() body: CreateRefundEntityDto){
				return this.service.createRow(body);
			}
		
}
