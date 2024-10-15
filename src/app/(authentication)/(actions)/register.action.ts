'use server';

import { PocketbaseError, SchemaValidationError } from '@/errors';
import pb from '@/pocketbase';
import { RegisterPayloadSchema, validate } from '@/schemas';
import { ActionState, RegisterPayload, User } from '@/types';
import { redirect } from 'next/navigation';
import { setAuthCookie } from '../auth.utils';

export default async function register(
	prev: ActionState<RegisterPayload> | null,
	formData: FormData
) {
	const payload = {
		email: formData.get('email'),
		username: formData.get('username'),
		password: formData.get('password'),
		passwordConfirm: formData.get('passwordConfirm'),
	} as RegisterPayload;

	try {
		const data = await validate(payload, RegisterPayloadSchema);
		await pb.collection('users').create(data);
		const { token, record } = await pb
			.collection<User>('users')
			.authWithPassword(data.username, data.password);
		setAuthCookie({ token, user: record });
		redirect('/');
	} catch (error) {
		if (SchemaValidationError.is<RegisterPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}
