'use server';

import db from '@/db';

export default async function getUserByUsername(username: string) {
	const user = await db.query.users.findFirst({
		where: (model, { eq }) => eq(model.username, username),
	});
	return user;
}
