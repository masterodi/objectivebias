import { PocketbaseError } from '@/errors';
import pb from '@/pocketbase';
import { LoginPayloadSchema, RegisterPayloadSchema, validate } from '@/schemas';
import { LoginPayload, RegisterPayload, Session } from '@/types';
import { AUTH_COOKIE, AuthCookieOptions } from '@/utils';
import { cookies } from 'next/headers';

async function login(payload: LoginPayload) {
	try {
		const data = await validate(payload, LoginPayloadSchema);

		const { token, record: model } = await pb
			.collection('users')
			.authWithPassword(data.username, data.password);

		const cookie = JSON.stringify({ token, model });
		cookies().set(AUTH_COOKIE, cookie, AuthCookieOptions);
	} catch (error) {
		throw PocketbaseError.auth(error);
	}
}

async function register(payload: RegisterPayload) {
	try {
		const data = await validate(payload, RegisterPayloadSchema);

		const record = await pb.collection('users').create(data);

		const { token, record: model } = await pb
			.collection('users')
			.authWithPassword(data.username, data.password);

		const cookie = JSON.stringify({ token, model });
		cookies().set(AUTH_COOKIE, cookie, AuthCookieOptions);
	} catch (error) {
		throw PocketbaseError.auth(error);
	}
}

async function logout() {
	cookies().delete(AUTH_COOKIE);
}

async function session() {
	const authCookie = cookies().get(AUTH_COOKIE);
	const model = authCookie?.value ? JSON.parse(authCookie.value).model : null;
	return model as Session;
}

async function token() {
	const authCookie = cookies().get(AUTH_COOKIE);
	const token = authCookie?.value ? JSON.parse(authCookie.value).token : null;
	return token as string;
}

const AuthService = {
	login,
	register,
	logout,
	session,
	token,
};

export default AuthService;
