'use server';

import { PocketbaseError, SchemaValidationError } from '@/errors';
import pb from '@/pocketbase';
import { LoginPayloadSchema, validate } from '@/schemas';
import { ActionState, LoginPayload, User } from '@/types';
import { redirect } from 'next/navigation';
import { setAuthCookie } from '../auth.utils';

export default async function login(
	prev: ActionState<LoginPayload> | null,
	formData: FormData
) {
	const payload = {
		username: formData.get('username'),
		password: formData.get('password'),
	} as LoginPayload;

	try {
		const data = await validate(payload, LoginPayloadSchema);
		const { token, record } = await pb
			.collection<User>('users')
			.authWithPassword(data.username, data.password);
		setAuthCookie({ token, user: record });
		redirect('/');
	} catch (error) {
		if (SchemaValidationError.is<LoginPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}
