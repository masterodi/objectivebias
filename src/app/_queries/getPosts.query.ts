'use server';

import db from '@/db';

type GetPostsConfig = {
	orderBy?: 'title' | 'slug' | 'createdAt' | 'updatedAt';
	orderDir?: 'asc' | 'desc';
};

export default async function getPosts(config?: GetPostsConfig) {
	const posts = await db.query.posts.findMany({
		with: { tagsToPosts: { columns: {}, with: { tag: true } } },
		orderBy: (model, { asc, desc }) => {
			const { orderBy = 'createdAt', orderDir } = config ?? {};
			const dirFn = orderDir === 'desc' ? desc : asc;
			return dirFn(model[orderBy]);
		},
	});

	return posts.map((post) => {
		const { tagsToPosts, ...rest } = post;
		return { ...rest, tags: tagsToPosts.map((tp) => tp.tag) };
	});
}
