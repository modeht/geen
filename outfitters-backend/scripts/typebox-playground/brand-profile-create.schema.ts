// import { Type } from 'class-transformer';
import { Static, Type } from '@sinclair/typebox';
// import { TRef, UserCreateSchema } from './user-create.schema';
import { IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

// export const BrandProfileCreateSchema = Type.Object(
// 	{
// 		id: Type.Number(),
// 		user: Type.Ref(UserCreateSchema) as TRef<typeof UserCreateSchema>,
// 	},
// 	{
// 		$id: 'BrandProfileCreateSchema',
// 	},
// );

// export class BrandProfileCreateSchema {
// 	@IsNumber()
// 	id: number;

// 	@Type(() => UserCreateSchema)
// 	@IsObject()
// 	@IsOptional()
// 	@ValidateNested()
// 	user?: UserCreateSchema;
// }

// const schemas = validationMetadatasToSchemas();
// console.dir(schemas, { depth: null });
