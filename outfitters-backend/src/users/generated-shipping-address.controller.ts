import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateShippingAddressSchema, {
	TCreateShippingAddressSchemaInput,
	TCreateShippingAddressSchemaOutput,
} from './generated-schemas//create-shipping-address.schema';
import UpdateShippingAddressSchema, {
	TUpdateShippingAddressSchemaInput,
	TUpdateShippingAddressSchemaOutput,
} from './generated-schemas//update-shipping-address.schema';
import ReadShippingAddressSchema, {
	TReadShippingAddressSchemaInput,
	TReadShippingAddressSchemaOutput,
} from './generated-schemas//read-shipping-address-query.schema';
import { ShippingAddressEntity } from './entities/shipping-address.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { ShippingAddressService } from './generated-shipping-address.service';

@Controller('shipping-address')
export class ShippingAddressController {
	constructor(private service: ShippingAddressService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateShippingAddress,
		},
	})
	async create(
		@MoBody(CreateShippingAddressSchema) body: TCreateShippingAddressSchemaOutput,
	) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateShippingAddress,
		},
	})
	async update(
		@Param('id') id: string,
		@MoBody(UpdateShippingAddressSchema) body: TUpdateShippingAddressSchemaOutput,
	) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadShippingAddressQuery,
		},
	})
	async read(
		@MoQuery(ReadShippingAddressSchema) query: TReadShippingAddressSchemaOutput,
	) {
		return this.service.readRows(query);
	}
}
