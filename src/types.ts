import { InferType } from 'yup';
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
export type PostWithTagsUser = Post & ExpandTags & ExpandUser;

export type Session = {
	user: User;
	isModerator: boolean;
};

export type LoginPayload = InferType<typeof LoginPayloadSchema>;
export type RegisterPayload = InferType<typeof RegisterPayloadSchema>;
export type CreatePostPayload = InferType<typeof CreatePostPayloadSchema>;
