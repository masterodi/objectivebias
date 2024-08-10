'use server';

import pb from '@/pocketbase';
import { PostSchema } from '@/schemas';
import { InferType } from 'yup';

export async function getPosts() {
	const data = await pb
		.collection('posts')
		.getFullList<InferType<typeof PostSchema>>({ sort: '-created' });
	return data;
}
