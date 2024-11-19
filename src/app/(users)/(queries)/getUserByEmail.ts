'use server';

import db from '@/db';

export default async function getUserByEmail(email: string) {
	const user = await db.query.users.findFirst({
		where: (model, { eq }) => eq(model.email, email),
	});
	return user;
}
