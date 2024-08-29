'use server';

import PostsService from '@/server/posts.service';

export async function getPosts(options?: any) {
	const data = await PostsService.getList(options);
	return data;
}

export async function getPostBySlug(slug: string, options?: any) {
	const data = await PostsService.getFiltered({ slug: slug }, options);
	return data;
}
