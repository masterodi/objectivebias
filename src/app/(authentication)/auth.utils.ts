import { Auth } from '@/types';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const AuthCookie = 'pb_auth';

const AuthCookieOptions: Partial<ResponseCookie> = {
	secure: true,
	path: '/',
	sameSite: 'strict',
	httpOnly: true,
};

export const getAuth = () => {
	const authCookie = cookies().get(AuthCookie);
	return authCookie?.value ?
			(JSON.parse(authCookie.value) as Auth)
		:	undefined;
};

export function setAuthCookie(data: Auth | null) {
	if (data) {
		const cookie = JSON.stringify(data);
		cookies().set(AuthCookie, cookie, AuthCookieOptions);
	} else {
		cookies().delete(AuthCookie);
	}
}
