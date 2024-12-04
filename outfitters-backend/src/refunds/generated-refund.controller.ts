import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateRefundSchema, { TCreateRefundSchemaInput, TCreateRefundSchemaOutput } from './generated-schemas//create-refund.schema'
import UpdateRefundSchema, { TUpdateRefundSchemaInput, TUpdateRefundSchemaOutput } from './generated-schemas//update-refund.schema'
import ReadRefundSchema, { TReadRefundSchemaInput, TReadRefundSchemaOutput } from './generated-schemas//read-refund-query.schema'
import { RefundEntity } from './entities/refund.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { RefundService } from './generated-refund.service'

@Controller('refund')
export class RefundController {
  
  constructor(private service: RefundService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateRefund
				}
			})
			async create(
				@MoBody(CreateRefundSchema) body: TCreateRefundSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateRefund
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateRefundSchema) body: TUpdateRefundSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadRefundQuery
				}
			})
			async read(
				@MoQuery(ReadRefundSchema) query: TReadRefundSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
