'use server';

import db from '@/db';

export default async function getTagBySlug(slug: string) {
	const tag = await db.query.tags.findFirst({
		where: (model, { eq }) => eq(model.slug, slug),
	});
	return tag;
}
