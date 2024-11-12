'use server';

import db, { tags, tagsToPosts } from '@/db';
import { OrderDir, PostsFilter, PostsOrderBy } from '@/types';

type GetPostsConfig = {
	orderBy?: PostsOrderBy;
	orderDir?: OrderDir;
	filter?: PostsFilter;
};

export default async function getPosts(config?: GetPostsConfig) {
	console.log({ config });

	const { orderBy = 'createdAt', orderDir, filter } = config ?? {};

	const posts = await db.query.posts.findMany({
		with: { tagsToPosts: { columns: {}, with: { tag: true } }, user: true },
		where: (model, { eq, inArray }) => {
			if (!filter) return;

			const { tag } = filter;

			if (tag) {
				const slugs = typeof tag === 'string' ? [tag] : tag;
				const q = db
					.select({ id: tagsToPosts.postId })
					.from(tags)
					.where(inArray(tags.slug, slugs))
					.innerJoin(tagsToPosts, eq(tagsToPosts.tagId, tags.id));
				return inArray(model.id, q);
			}

			return;
		},
		orderBy: (model, { asc, desc }) => {
			const dirFn = orderDir === 'desc' ? desc : asc;
			return dirFn(model[orderBy]);
		},
	});

	console.log({ posts });

	return posts.map((post) => {
		const { tagsToPosts, ...rest } = post;
		return { ...rest, tags: tagsToPosts.map((tp) => tp.tag) };
	});
}
