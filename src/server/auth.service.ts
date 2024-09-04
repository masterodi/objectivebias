import { PocketbaseError } from '@/errors';
import pb from '@/pocketbase';
import { LoginPayloadSchema, RegisterPayloadSchema, validate } from '@/schemas';
import { LoginPayload, RegisterPayload, Session, User } from '@/types';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

type Auth = {
	token: string;
	user: User;
};

const AuthCookie = 'pb_auth';

const AuthCookieOptions: Partial<ResponseCookie> = {
	secure: true,
	path: '/',
	sameSite: 'strict',
	httpOnly: true,
};

function setAuthCookie(data: Auth | null) {
	if (data) {
		const cookie = JSON.stringify(data);
		cookies().set(AuthCookie, cookie, AuthCookieOptions);
	} else {
		cookies().delete(AuthCookie);
	}
}

async function login(payload: LoginPayload) {
	try {
		const data = await validate(payload, LoginPayloadSchema);
		const { token, record } = await pb
			.collection<User>('users')
			.authWithPassword(data.username, data.password);
		setAuthCookie({ token, user: record });
	} catch (error) {
		throw PocketbaseError.auth(error);
	}
}

async function register(payload: RegisterPayload) {
	try {
		const data = await validate(payload, RegisterPayloadSchema);
		await pb.collection('users').create(data);
		const { token, record } = await pb
			.collection<User>('users')
			.authWithPassword(data.username, data.password);
		setAuthCookie({ token, user: record });
	} catch (error) {
		throw PocketbaseError.auth(error);
	}
}

function logout() {
	setAuthCookie(null);
}

function getAuth() {
	const authCookie = cookies().get(AuthCookie);
	return authCookie?.value ?
			(JSON.parse(authCookie.value) as Auth)
		:	undefined;
}

async function session(): Promise<Session | undefined> {
	const auth = getAuth();
	if (!auth) return undefined;
	const user = await pb.collection<User>('users').getOne(auth.user.id);
	return { user, isModerator: user.role === 'moderator' };
}

function token() {
	const auth = getAuth();
	return auth?.token;
}

const AuthService = {
	login,
	register,
	logout,
	session,
	token,
};

export default AuthService;
