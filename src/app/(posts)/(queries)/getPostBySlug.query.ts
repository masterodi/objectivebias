'use server';

import pb from '@/pocketbase';
import { PostWithTagsWithUser } from '@/types';

export default async function getPostBySlug(slug: string) {
	const data = await pb
		.collection<PostWithTagsWithUser>('posts')
		.getFirstListItem(`slug="${slug}"`, { expand: 'tags' });
	return data;
}
