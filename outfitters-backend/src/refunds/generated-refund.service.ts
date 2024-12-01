import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateRefundSchema, { TCreateRefundSchemaInput, TCreateRefundSchemaOutput } from './generated-schemas//create-refund.schema'
import UpdateRefundSchema, { TUpdateRefundSchemaInput, TUpdateRefundSchemaOutput } from './generated-schemas//update-refund.schema'
import ReadRefundSchema, { TReadRefundSchemaInput, TReadRefundSchemaOutput } from './generated-schemas//read-refund-query.schema'
import { RefundEntity } from './entities/refund.entity'

@Injectable()
export class RefundService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateRefundSchemaOutput){
				return await this.service.create(RefundEntity, body);
			}

			async updateRow(id: number, body: TUpdateRefundSchemaOutput){
				return await this.service.update(RefundEntity, id, body);
			}

			async readRows(query: TReadRefundSchemaOutput){
				return await this.service.read(RefundEntity, query);
			}
		
}
