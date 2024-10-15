import { InferType } from 'yup';
import { SchemaValidationError } from './errors';
import {
	CreatePostPayloadSchema,
	ExpandTagsSchema,
	ExpandUserSchema,
	LoginPayloadSchema,
	PostSchema,
	RegisterPayloadSchema,
	TagSchema,
	UserSchema,
} from './schemas';

export type User = InferType<typeof UserSchema> & {
	collectionId: string;
	collectionName: string;
	emailVisibility: boolean;
	id: string;
	verified: boolean;
};
export type Tag = InferType<typeof TagSchema>;
export type Post = InferType<typeof PostSchema>;
export type ExpandTags = InferType<typeof ExpandTagsSchema>;
export type ExpandUser = InferType<typeof ExpandUserSchema>;
export type PostWithTags = Post & ExpandTags;
export type PostWithUser = Post & ExpandUser;
export type PostWithTagsWithUser = Post & ExpandTags & ExpandUser;

export type Auth = {
	token: string;
	user: User;
};

export type Session = {
	user: User;
	isModerator: boolean;
};

export type LoginPayload = InferType<typeof LoginPayloadSchema>;
export type RegisterPayload = InferType<typeof RegisterPayloadSchema>;
export type CreatePostPayload = InferType<typeof CreatePostPayloadSchema>;

export type ExpandOptions = { tags?: true; created_by?: true };

export type QueryOptions<E extends ExpandOptions | undefined> = {
	expand?: E;
};

export type QueryResult<E extends ExpandOptions | undefined = undefined> =
	E extends { tags: true; created_by: true } ? PostWithTagsWithUser
	: E extends { tags: true } ? PostWithTags
	: E extends { created_by: true } ? PostWithUser
	: Post;

export type ActionState<T extends object> =
	| {
			payload: T;
			validation: ReturnType<SchemaValidationError<T>['serialize']>;
			error?: never;
	  }
	| { payload: T; validation?: never; error: string };
