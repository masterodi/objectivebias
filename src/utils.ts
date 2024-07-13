import { NextRequest } from 'next/server';

export const AUTH_COOKIE = 'pb_auth';

export function getAuthToken(request: NextRequest) {
	const authCookie = request.cookies.get(AUTH_COOKIE);
	const token = authCookie?.value ? JSON.parse(authCookie.value).token : null;
	return token;
}
