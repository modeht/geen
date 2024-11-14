/* eslint-disable @typescript-eslint/no-namespace */
import { toJsonSchema } from '@valibot/to-json-schema';
import { log } from 'console';
import * as v from 'valibot';

export const profile = v.object({
	id: v.number(),
	user: v.lazy(() => user),
});

class Profile {
	id: number;
}

class User {
	id: number;
	profile: Profile;
}

export const user: v.GenericSchema<User> = v.object({
	id: v.number(),
	profile: v.lazy(() => profile),
});

// const JsonEmailSchema = toJsonSchema(user); // { type: 'string', format: 'email' }
// log(JSON.stringify(JsonEmailSchema));
// type user = v.InferInput<typeof user>;
