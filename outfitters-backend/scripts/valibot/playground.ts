/* eslint-disable @typescript-eslint/no-namespace */
import { toJsonSchema } from '@valibot/to-json-schema';
import { log } from 'console';
import * as v from 'valibot';

export enum PrimitiveTypes {
	'number',
	'string',
	'boolean',
	'string[]',
	'number[]',
	'boolean[]',
}

const t = 'number[]';

console.log(PrimitiveTypes['asd']);

export const profile = v.object({
	id: v.number(),
	user: v.lazy(() => user),
});

class Profile {
	id: number;
	user: User;
}

class User {
	id: number;
	profile: Profile;
}

class CreateUserSchema {
	//based on user schema after modifications and what not
	//
}

export const user: v.GenericSchema<User> = v.object({
	id: v.number(),
	profile: v.lazy(() => profile),
});

// const JsonEmailSchema = toJsonSchema(user); // { type: 'string', format: 'email' }
// log(JSON.stringify(JsonEmailSchema));

type user = v.InferInput<typeof user>;

//what are the cases
//primitive field: no issue
// json type field? or array type field?
//complex field:
//should it allow multiple levels? i can but it is risky and can be complex
//i think not, for insert it should be maximum one level
//make sure it works from the parent side and the child side
//flow for performance->
//create each class with also the immediate subclass
//assume where the class is gonna be as of path and name
//what if i create it->save it with possible fiel, no no
//maybe create it as well:no
//so lets create it and assume the location and the import name
//or maybe create a specific iteration for that class, not necessary because you'll always have that one schema,
//but maybe for future atomic changes per use cases, i think i cannot use a generic one for the create dtos
//it has to be unique per class-> the question is now either to create different files or not?
//i say not! and lets see where it goes
/**
 * plan: create schema/dto
 * for each class create a mapped type representing the schema
 */
