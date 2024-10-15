'use server';

import db from '@/db';

export default async function getPostByTitle(title: string) {
	const post = await db.query.posts.findFirst({
		where: (model, { eq }) => eq(model.title, title),
	});
	return post;
}
