import { InferInsertModel } from 'drizzle-orm';
import { User as LuciaUser } from 'lucia';
import { InferType } from 'yup';
import { posts, tags, users } from './db';
import {
	LoginPayloadSchema,
	PostCreatePayloadSchema,
	PostSchema,
	PostUpdatePayloadSchema,
	PostUpsertDataSchema,
	RegisterPayloadSchema,
	TagCreatePayloadSchema,
	TagSchema,
	TagUpdatePayloadSchema,
	TagUpsertDataSchema,
	UserSchema,
} from './schemas';

export type ViewSearchParam = 'posts' | 'tags';
export type UpsertTagSearchParam = 'true';
export type UpsertTagIdSearchParam = string;
export type OrderDir = 'asc' | 'desc';
export type PostsOrderBy = 'title' | 'slug' | 'createdAt' | 'updatedAt';
export type PostsFilter = {
	tag?: string | string[] | null;
};
export type TagsOrderBy = 'title' | 'slug' | 'createdAt';

export type User = InferType<typeof UserSchema>;
export type UserInsert = InferInsertModel<typeof users>;
export type LoginPayload = InferType<typeof LoginPayloadSchema>;
export type RegisterPayload = InferType<typeof RegisterPayloadSchema>;

export type Tag = InferType<typeof TagSchema>;
export type TagInsert = InferInsertModel<typeof tags>;
export type TagCreatePayload = InferType<typeof TagCreatePayloadSchema>;
export type TagUpdatePayload = InferType<typeof TagUpdatePayloadSchema>;
export type TagUpsertData = InferType<typeof TagUpsertDataSchema>;

export type Post = InferType<typeof PostSchema>;
export type PostWithTagsWithUser = Post & { tags: Tag[]; user: LuciaUser };
export type PostInsert = InferInsertModel<typeof posts>;
export type PostCreatePayload = InferType<typeof PostCreatePayloadSchema>;
export type PostUpdatePayload = InferType<typeof PostUpdatePayloadSchema>;
export type PostUpsertData = InferType<typeof PostUpsertDataSchema>;
