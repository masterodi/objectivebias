'use server';

import pb from '@/pocketbase';
import { RecordListOptions } from 'pocketbase';
import { GetPostBySlug, Options, PostWithOptions } from './types';
import { createExpand } from './utils';

export default async function getPostBySlug(slug: string): GetPostBySlug;
export default async function getPostBySlug<O extends Options>(
	slug: string,
	options: O
): GetPostBySlug<O>;
export default async function getPostBySlug(
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
