'use server';

import db, { users } from '@/db';
import { lucia } from '@/lucia';
import { RegisterPayload, RegisterPayloadSchema, validate } from '@/schemas';
import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getUserByEmail from '../_queries/getUserByEmail.query';
import getUserByUsername from '../_queries/getUserByUsername.query';

export default async function register(payload: RegisterPayload) {
	const { data, error } = await validate(payload, RegisterPayloadSchema);

	if (error) {
		return { validationError: error.toJson() };
	}

	const existingEmailUser = await getUserByEmail(data.email);
	if (existingEmailUser) {
		return { error: 'Email is already used' };
	}

	const existingUsernameUser = await getUserByUsername(data.username);
	if (existingUsernameUser) {
		return { error: 'Username is already used' };
	}

	if (data.password !== data.passwordConfirm) {
		return { error: 'Passwords do not match' };
	}

	const passwordHash = await hash(data.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const user = { email: data.email, username: data.username, passwordHash };

	const insertResult = await db
		.insert(users)
		.values(user)
		.returning({ insertedId: users.id });

	const session = await lucia.createSession(insertResult[0].insertedId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const cookieStore = await cookies();
	cookieStore.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/');
}
