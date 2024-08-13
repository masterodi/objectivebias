'use server';

import pb from '@/pocketbase';
import { PostSchema } from '@/schemas';
import { RecordFullListOptions } from 'pocketbase';
import { InferType } from 'yup';

export async function getPosts({ withTags } = { withTags: false }) {
	const options: RecordFullListOptions = {
		sort: '-created',
		expand: withTags ? 'tags' : undefined,
	};
	let data = await pb
		.collection('posts')
		.getFullList<InferType<typeof PostSchema>>(options);
	return data;
}
