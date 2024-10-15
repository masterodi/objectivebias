'use server';

import db from '@/db';

export default async function getTags() {
	const tags = await db.query.tags.findMany();
	return tags;
}
