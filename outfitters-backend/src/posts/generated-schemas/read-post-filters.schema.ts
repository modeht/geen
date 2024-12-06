import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadTaggedProductFiltersSchema, {
	ReadTaggedProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-tagged-product-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadPostLikesFiltersSchema, { ReadPostLikesFiltersSchemaFilters } from './read-post-likes-filters.schema';
import ReadCommentFiltersSchema, {
	ReadCommentFiltersSchemaFilters,
} from '../../comments/generated-schemas/read-comment-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';
import ReadSavedCollectionItemFiltersSchema, {
	ReadSavedCollectionItemFiltersSchemaFilters,
} from '../../saved-collections/generated-schemas/read-saved-collection-item-filters.schema';

export class ReadPostFiltersSchemaFilters {
	caption?: GenericComparable<'string'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	thumbnail?: ReadMediaFiltersSchemaFilters | null;
	taggedProducts?: ReadTaggedProductFiltersSchemaFilters | null;
	postedBy?: ReadUserFiltersSchemaFilters | null;
	postedById?: GenericComparable<'number'> | null;
	taggedUsers?: ReadUserFiltersSchemaFilters | null;
	likedByUsers?: ReadPostLikesFiltersSchemaFilters | null;
	comments?: ReadCommentFiltersSchemaFilters | null;
	shares?: ReadMessageFiltersSchemaFilters | null;
	savedInCollections?: ReadSavedCollectionItemFiltersSchemaFilters | null;
	thumbnailId?: GenericComparable<'number'> | null;
	likesCount?: GenericComparable<'number'> | null;
	commentsCount?: GenericComparable<'number'> | null;
	taggedProductsCount?: GenericComparable<'number'> | null;
	taggedUsersCount?: GenericComparable<'number'> | null;
	isLiked?: GenericComparable<'bool'> | null;
}

const ReadPostFiltersSchema: v.GenericSchema<ReadPostFiltersSchemaFilters> = v.object({
	caption: v.nullish(comparable('string')),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	thumbnail: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductFiltersSchema)),
	postedBy: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	postedById: v.nullish(comparable('number')),
	taggedUsers: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	likedByUsers: v.nullish(v.lazy(() => ReadPostLikesFiltersSchema)),
	comments: v.nullish(v.lazy(() => ReadCommentFiltersSchema)),
	shares: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	savedInCollections: v.nullish(v.lazy(() => ReadSavedCollectionItemFiltersSchema)),
	thumbnailId: v.nullish(comparable('number')),
	likesCount: v.nullish(comparable('number')),
	commentsCount: v.nullish(comparable('number')),
	taggedProductsCount: v.nullish(comparable('number')),
	taggedUsersCount: v.nullish(comparable('number')),
	isLiked: v.nullish(comparable('bool')),
});

export default ReadPostFiltersSchema;

export type TReadPostFiltersSchemaOutput = v.InferOutput<typeof ReadPostFiltersSchema>;
export type TReadPostFiltersSchemaInput = v.InferInput<typeof ReadPostFiltersSchema>;
