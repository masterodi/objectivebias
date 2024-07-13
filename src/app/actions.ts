'use server';

import pb from '@/pocketbase';
import { AUTH_COOKIE } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
	'use server';
	const data = {
		username: formData.get('username') as string,
		password: formData.get('password') as string,
	};
	const { token, record: model } = await pb
		.collection('users')
		.authWithPassword(data.username, data.password);

	const cookie = JSON.stringify({ token, model });

	cookies().set(AUTH_COOKIE, cookie, {
		secure: true,
		path: '/',
		sameSite: 'strict',
		httpOnly: true,
	});

	redirect('/');
}

export async function register(formData: FormData) {
	'use server';
	const data = {
		email: formData.get('email') as string,
		username: formData.get('username') as string,
		password: formData.get('password') as string,
		passwordConfirm: formData.get('password-confirm') as string,
	};
	await pb.collection('users').create(data);
	const { token, record: model } = await pb
		.collection('users')
		.authWithPassword(data.username, data.password);

	const cookie = JSON.stringify({ token, model });

	cookies().set(AUTH_COOKIE, cookie, {
		secure: true,
		path: '/',
		sameSite: 'strict',
		httpOnly: true,
	});

	redirect('/');
}

export async function logout() {
	cookies().delete(AUTH_COOKIE);
	redirect('/');
}
