'use server';

import db from '@/db';

export default async function getTagByName(name: string) {
	const tag = await db.query.tags.findFirst({
		where: (model, { eq }) => eq(model.name, name),
	});
	return tag;
}
