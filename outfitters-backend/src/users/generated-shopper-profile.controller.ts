import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateShopperProfileSchema, { TCreateShopperProfileSchemaInput, TCreateShopperProfileSchemaOutput } from './generated-schemas//create-shopper-profile.schema'
import UpdateShopperProfileSchema, { TUpdateShopperProfileSchemaInput, TUpdateShopperProfileSchemaOutput } from './generated-schemas//update-shopper-profile.schema'
import ReadShopperProfileSchema, { TReadShopperProfileSchemaInput, TReadShopperProfileSchemaOutput } from './generated-schemas//read-shopper-profile-query.schema'
import { ShopperProfileEntity } from './entities/shopper-profile.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ShopperProfileService } from './generated-shopper-profile.service'

@Controller('shopper-profile')
export class ShopperProfileController {
  
  constructor(private service: ShopperProfileService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateShopperProfile
				}
			})
			async create(
				@MoBody(CreateShopperProfileSchema) body: TCreateShopperProfileSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateShopperProfile
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateShopperProfileSchema) body: TUpdateShopperProfileSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadShopperProfileQuery
				}
			})
			async read(
				@MoQuery(ReadShopperProfileSchema) query: TReadShopperProfileSchemaOutput,
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
