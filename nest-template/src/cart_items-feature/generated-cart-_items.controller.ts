import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCart_itemsSchema, {
	TCreateCart_itemsSchemaInput,
	TCreateCart_itemsSchemaOutput,
} from './generated-schemas//create-cart-_items.schema';
import UpdateCart_itemsSchema, {
	TUpdateCart_itemsSchemaInput,
	TUpdateCart_itemsSchemaOutput,
} from './generated-schemas//update-cart-_items.schema';
import ReadCart_itemsSchema, {
	TReadCart_itemsSchemaInput,
	TReadCart_itemsSchemaOutput,
} from './generated-schemas//read-cart-_items-query.schema';
import ReadOneCart_itemsSchema, {
	TReadOneCart_itemsSchemaInput,
	TReadOneCart_itemsSchemaOutput,
} from './generated-schemas//read-one-cart-_items-query.schema';
import { Cart_itemsEntity } from './entities/cart_items.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { Cart_itemsService } from './generated-cart-_items.service';

@Controller('cart-_items')
export class Cart_itemsController {
	constructor(private service: Cart_itemsService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateCart_items,
		},
	})
	async create(@MoBody(CreateCart_itemsSchema) body: TCreateCart_itemsSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateCart_items,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateCart_itemsSchema) body: TUpdateCart_itemsSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCart_itemsQuery,
		},
	})
	async read(@MoQuery(ReadCart_itemsSchema) query: TReadCart_itemsSchemaOutput) {
		return this.service.readRows(query);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRow(+id);
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		return this.service.softDeleteRow(+id);
	}

	@Get(':id')
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOneCart_itemsQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneCart_itemsSchema) query: TReadOneCart_itemsSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
