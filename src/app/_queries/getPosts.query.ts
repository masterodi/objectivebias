'use server';

import db from '@/db';

export default async function getPosts() {
	const posts = await db.query.posts.findMany({
		with: { tagsToPosts: { columns: {}, with: { tag: true } } },
	});

	return posts.map((post) => {
		const { tagsToPosts, ...rest } = post;
		return { ...rest, tags: tagsToPosts.map((tp) => tp.tag) };
	});
}
