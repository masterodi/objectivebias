'use server';

import PostsService from '@/server/posts.service';

export async function getPosts(options?: any) {
	const data = await PostsService.getList(options);
	return data;
}

export async function getPostBySlug(slug: string) {
	const data = await PostsService.getFiltered(
		{ slug },
		{ expand: { tags: true, created_by: true } }
	);
	return data;
}
