import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateUserSchema, { TCreateUserSchemaInput, TCreateUserSchemaOutput } from './generated-schemas//create-user.schema'
import UpdateUserSchema, { TUpdateUserSchemaInput, TUpdateUserSchemaOutput } from './generated-schemas//update-user.schema'
import ReadUserSchema, { TReadUserSchemaInput, TReadUserSchemaOutput } from './generated-schemas//read-user-query.schema'
import { UserEntity } from './entities/user.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { UserService } from './generated-user.service'

@Controller('user')
export class UserController {
  
  constructor(private service: UserService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateUser
				}
			})
			async create(
				@MoBody(CreateUserSchema) body: TCreateUserSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateUser
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateUserSchema) body: TUpdateUserSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadUserQuery
				}
			})
			async read(
				@MoQuery(ReadUserSchema) query: TReadUserSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
