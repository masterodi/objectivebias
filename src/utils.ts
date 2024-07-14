import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { ClientResponseError } from 'pocketbase';

const INVALID_LENGTH_CODE = 'validation_length_out_of_range';
const PASSWORDS_MISMATCH_CODE = 'validation_values_mismatch';

function mapPocketbaseError(
	error: ClientResponseError,
	defaultMessage = 'Something went wrong.'
): string {
	const { data } = error.response;

	if (data.email) {
		return data.email.message;
	}

	if (data.username) {
		return data.username.message;
	}

	if (data.password?.code === INVALID_LENGTH_CODE) {
		return 'The password length must be between 8 and 12 characters.';
	}

	if (data.password) {
		return data.password.message;
	}

	if (data.passwordConfirm?.code === PASSWORDS_MISMATCH_CODE) {
		return 'Passwords do not match.';
	}

	if (data.passwordConfirm) {
		return data.passwordConfirm.message;
	}

	return defaultMessage;
}

export function maybeGetError(error: unknown, defaultMessage?: string) {
	if (!(error instanceof ClientResponseError)) throw error;
	return mapPocketbaseError(error, defaultMessage);
}

export const AUTH_COOKIE = 'pb_auth';

export const AuthCookieOptions: Partial<ResponseCookie> = {
	secure: true,
	path: '/',
	sameSite: 'strict',
	httpOnly: true,
};

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
