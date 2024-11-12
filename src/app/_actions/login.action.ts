'use server';

import { lucia } from '@/lucia';
import { LoginPayloadSchema, validate } from '@/schemas';
import { LoginPayload } from '@/types';
import { verify } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getUserByUsername from '../_queries/getUserByUsername.query';

export default async function login(payload: LoginPayload) {
	const { data, error } = await validate(payload, LoginPayloadSchema);

	if (error) {
		return { validationError: error.toJson() };
	}

	const existingUser = await getUserByUsername(data.username);
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: 'Incorrect username or password',
		};
	}

	const validPassword = await verify(
		existingUser.passwordHash,
		data.password,
		{
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		}
	);
	if (!validPassword) {
		return {
			error: 'Incorrect username or password',
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const cookieStore = await cookies();
	cookieStore.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/');
}
