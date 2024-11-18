// create the classes
// all fields are

import * as v from 'valibot';
import { comparable, GenericComparable } from '../../src/globals/lib/comparable';

class ProfileRelations {
	user?: UserRelations | boolean | null | undefined;
}

class UserRelations {
	profile?: ProfileRelations | boolean | null | undefined;
}

const ProfileRelationsSchema: v.GenericSchema<ProfileRelations> = v.object({
	user: v.nullish(v.lazy(() => UserRelationsSchema)),
});

const UserRelationsSchema = v.object({
	profile: v.nullish(v.union([v.boolean(), v.lazy(() => ProfileRelationsSchema)])),
});

type TUserSchema = v.InferInput<typeof UserRelationsSchema>;

const d: TUserSchema = {};
