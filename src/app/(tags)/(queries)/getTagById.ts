'use server';

import db from '@/db';

export default async function getTagById(id: string) {
	const tag = await db.query.tags.findFirst({
		where: (model, { eq }) => eq(model.id, id),
	});
	return tag;
}
