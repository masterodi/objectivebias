'use server';

import db from '@/db';

export default async function getPostById(id: string) {
	const post = await db.query.posts.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});
	return post;
}
