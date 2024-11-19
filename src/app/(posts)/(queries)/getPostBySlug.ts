'use server';

import db from '@/db';

export default async function getPostBySlug(slug: string) {
	const post = await db.query.posts.findFirst({
		where: (model, { eq }) => eq(model.slug, slug),
		with: {
			tagsToPosts: { columns: {}, with: { tag: true } },
			user: { columns: { passwordHash: false } },
		},
	});
	if (!post) return;
	const { tagsToPosts, ...rest } = post;
	return { ...rest, tags: tagsToPosts.map((tp) => tp.tag) };
}
