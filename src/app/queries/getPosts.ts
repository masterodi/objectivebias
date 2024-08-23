'use server';

import pb from '@/pocketbase';
import { RecordFullListOptions } from 'pocketbase';
import { GetPosts, Options, PostWithOptions } from './types';
import { createExpand } from './utils';

export default async function getPosts(): GetPosts;
export default async function getPosts<O extends Options>(
	options: O
): GetPosts<O>;
export default async function getPosts(
	options?: Options
): GetPosts<typeof options> {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand: createExpand(options),
	};

	const data = await pb
		.collection('posts')
		.getFullList<PostWithOptions<typeof options>>(queryOptions);

	return data;
}
