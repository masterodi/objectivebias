'use server';

import { PocketbaseError, ValidationError } from '@/errors';
import AuthService from '@/server/auth.service';
import { LoginPayload, RegisterPayload } from '@/types';
import { redirect } from 'next/navigation';
import { ActionState } from './types';

export async function login(
	prev: ActionState<LoginPayload> | null,
	formData: FormData
) {
	const payload = {
		username: formData.get('username'),
		password: formData.get('password'),
	} as LoginPayload;

	try {
		await AuthService.login(payload);
		redirect('/');
	} catch (error) {
		if (ValidationError.is<LoginPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}

export async function register(
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
		await AuthService.register(payload);
		redirect('/');
	} catch (error) {
		if (ValidationError.is<RegisterPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}

export async function logout() {
	AuthService.logout();
	redirect('/');
}
