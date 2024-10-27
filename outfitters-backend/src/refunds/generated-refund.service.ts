import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddRefundEntityDto } from './generated-dtos/add-refund-entity.dto'
import { RefundEntity } from './entities/refund.entity'

@Injectable()
export class RefundService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddRefundEntityDto){
				return await this.service.create(RefundEntity, AddRefundEntityDto, body);
			}
		
}
