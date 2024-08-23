import { Post, PostWithTags, PostWithTagsUser, PostWithUser } from '@/types';

export type Options = {
	with?: { tags?: boolean; created_by?: boolean };
};

export type PostWithOptions<T extends Options | undefined = undefined> =
	T extends { with: { tags: true; created_by: true } } ? PostWithTagsUser
	: T extends { with: { tags: true } } ? PostWithTags
	: T extends { with: { created_by: true } } ? PostWithUser
	: Post;

export type GetPosts<O extends Options | undefined = undefined> = Promise<
	PostWithOptions<O>[]
>;

export type GetPostBySlug<O extends Options | undefined = undefined> = Promise<
	PostWithOptions<O>
>;
