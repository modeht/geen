import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateCartItemsSchema, { TCreateCartItemsSchemaInput, TCreateCartItemsSchemaOutput } from './generated-schemas//create-cart-items.schema'
import UpdateCartItemsSchema, { TUpdateCartItemsSchemaInput, TUpdateCartItemsSchemaOutput } from './generated-schemas//update-cart-items.schema'
import ReadCartItemsSchema, { TReadCartItemsSchemaInput, TReadCartItemsSchemaOutput } from './generated-schemas//read-cart-items-query.schema'
import { CartItemsEntity } from './entities/cart-item.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { CartItemsService } from './generated-cart-items.service'

@Controller('cart-items')
export class CartItemsController {
  
  constructor(private service: CartItemsService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateCartItems
				}
			})
			async create(
				@MoBody(CreateCartItemsSchema) body: TCreateCartItemsSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateCartItems
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateCartItemsSchema) body: TUpdateCartItemsSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadCartItemsQuery
				}
			})
			async read(
				@MoQuery(ReadCartItemsSchema) query: TReadCartItemsSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
