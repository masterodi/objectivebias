'use server';

import pb from '@/pocketbase';
import { Post, PostWithTags, PostWithTagsUser, PostWithUser } from '@/types';
import { RecordFullListOptions, RecordListOptions } from 'pocketbase';

type Options = {
	with?: { tags?: boolean; created_by?: boolean };
};

type PostWithOptions<T extends Options | undefined = undefined> =
	T extends { with: { tags: true; created_by: true } } ? PostWithTagsUser
	: T extends { with: { tags: true } } ? PostWithTags
	: T extends { with: { created_by: true } } ? PostWithUser
	: Post;

function createExpand(options?: Options) {
	let expand: string | undefined;

	if (!options || !options.with) return;

	if (options.with.tags) {
		expand = 'tags';
	}

	if (options.with.created_by) {
		expand = expand ? `${expand},created_by` : 'created_by';
	}

	return expand;
}

type GetPosts<O extends Options | undefined = undefined> = Promise<
	PostWithOptions<O>[]
>;

export async function getPosts(): GetPosts;
export async function getPosts<O extends Options>(options: O): GetPosts<O>;
export async function getPosts(options?: Options): GetPosts<typeof options> {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand: createExpand(options),
	};

	const data = await pb
		.collection('posts')
		.getFullList<PostWithOptions<typeof options>>(queryOptions);

	return data;
}

type GetPostBySlug<O extends Options | undefined = undefined> = Promise<
	PostWithOptions<O>
>;

export async function getPostBySlug(slug: string): GetPostBySlug;
export async function getPostBySlug<O extends Options>(
	slug: string,
	options: O
): GetPostBySlug<O>;
export async function getPostBySlug(
	slug: string,
	options?: Options
): GetPostBySlug<typeof options> {
	const queryOptions: RecordListOptions = {
		expand: createExpand(options),
	};

	const data = await pb
		.collection('posts')
		.getFirstListItem<
			PostWithOptions<typeof options>
		>(`slug="${slug}"`, queryOptions);

	return data;
}
