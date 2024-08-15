import { InferType } from 'yup';
import {
	ExpandTagsSchema,
	ExpandUserSchema,
	PostSchema,
	TagSchema,
	UserSchema,
} from './schemas';

export type User = InferType<typeof UserSchema>;
export type Tag = InferType<typeof TagSchema>;
export type Post<E extends object = {}> = InferType<typeof PostSchema> & E;

export type Session = User & {
	collectionId: string;
	collectionName: string;
	emailVisibility: boolean;
	id: string;
	verified: boolean;
};

export type ExpandTags = InferType<typeof ExpandTagsSchema>;
export type ExpandUser = InferType<typeof ExpandUserSchema>;

export type PostWithTags = Post<ExpandTags>;
export type PostWithUser = Post<ExpandUser>;
export type PostWithTagsUser = Post<ExpandTags & ExpandUser>;
