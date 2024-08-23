import { AUTH_COOKIE } from '@/utils';
import { cookies } from 'next/headers';

export function getAuthToken() {
	const authCookie = cookies().get(AUTH_COOKIE);
	const token = authCookie?.value ? JSON.parse(authCookie.value).token : null;
	return token;
}

export function getAuth() {
	const authCookie = cookies().get(AUTH_COOKIE);
	const model = authCookie?.value ? JSON.parse(authCookie.value).model : null;
	return model;
}
