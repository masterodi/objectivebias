'use server';

import pb from '@/pocketbase';
import { LoginForm, RegisterForm, safeValidate } from '@/schemas';
import { AUTH_COOKIE, AuthCookieOptions, maybeGetError } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type ActionState = {
	payload?: Record<string, FormDataEntryValue | null>;
	validationErrors?: Record<string, string[]>;
	error?: string | null;
};

const LOGIN_ERROR_MESSAGE =
	'Failed to authenticate. Please check your credentials.';

export async function login(prevState: ActionState, formData: FormData) {
	const value = Object.fromEntries(formData);

	const [data, error] = await safeValidate(value, LoginForm);

	if (error) return { validationErrors: error, payload: value };

	try {
		const { token, record: model } = await pb
			.collection('users')
			.authWithPassword(data.username, data.password);

		const cookie = JSON.stringify({ token, model });
		cookies().set(AUTH_COOKIE, cookie, AuthCookieOptions);

		redirect('/');
		return {};
	} catch (err) {
		return {
			error: maybeGetError(err, LOGIN_ERROR_MESSAGE),
			payload: value,
		};
	}
}

const REGISTER_ERROR_MESSAGE =
	'Something went wrong when creating an account. Please try again.';

export async function register(prevState: ActionState, formData: FormData) {
	const value = Object.fromEntries(formData.entries());

	const [data, error] = await safeValidate(value, RegisterForm);

	if (error) return { validationErrors: error, payload: value };

	try {
		await pb.collection('users').create(data);

		const { token, record: model } = await pb
			.collection('users')
			.authWithPassword(data.username, data.password);

		const cookie = JSON.stringify({ token, model });
		cookies().set(AUTH_COOKIE, cookie, AuthCookieOptions);

		redirect('/');
		return {};
	} catch (err) {
		return {
			error: maybeGetError(err, REGISTER_ERROR_MESSAGE),
			payload: value,
		};
	}
}

export async function logout() {
	cookies().delete(AUTH_COOKIE);
	redirect('/');
}
