import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateCartSchema, { TCreateCartSchemaInput, TCreateCartSchemaOutput } from './generated-schemas//create-cart.schema'
import UpdateCartSchema, { TUpdateCartSchemaInput, TUpdateCartSchemaOutput } from './generated-schemas//update-cart.schema'
import ReadCartSchema, { TReadCartSchemaInput, TReadCartSchemaOutput } from './generated-schemas//read-cart-query.schema'
import { CartEntity } from './entities/cart.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { CartService } from './generated-cart.service'

@Controller('cart')
export class CartController {
  
  constructor(private service: CartService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateCart
				}
			})
			async create(
				@MoBody(CreateCartSchema) body: TCreateCartSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateCart
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateCartSchema) body: TUpdateCartSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadCartQuery
				}
			})
			async read(
				@MoQuery(ReadCartSchema) query: TReadCartSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		

			@Delete(':id')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.deleteRow(+id);
			}
		

			@Delete(':id/soft')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
