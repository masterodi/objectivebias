import { ClientResponseError } from 'pocketbase';
import RequestError from './RequestError';
import { ErrorCode, ERRORS_DATA, PB_ERROR_CODE } from './utils';

export default class PocketbaseError extends RequestError {
	constructor(args?: { message?: string; code?: ErrorCode }) {
		super(args);
	}

	static auth(error?: unknown) {
		if (!(error instanceof ClientResponseError)) throw error;

		const { data } = error.response;

		if (data.email?.code === PB_ERROR_CODE.invalid_email) {
			return new PocketbaseError(ERRORS_DATA.INVALID_EMAIL);
		}

		if (data.username?.code === PB_ERROR_CODE.invalid_username) {
			return new PocketbaseError(ERRORS_DATA.INVALID_USERNAME);
		}

		if (data.password?.code === PB_ERROR_CODE.invalid_password_length) {
			return new PocketbaseError(ERRORS_DATA.INVALID_PASSWORD_LENGTH);
		}

		if (data.passwordConfirm?.code === PB_ERROR_CODE.passwords_mismatch) {
			return new PocketbaseError(ERRORS_DATA.PASSWORDS_MISMATCH);
		}

		if (error.url.includes('/auth-with-password')) {
			return new PocketbaseError(ERRORS_DATA.FAILED_AUTHENTICATION);
		}

		throw error;
	}

	static posts(error?: unknown) {
		if (!(error instanceof ClientResponseError)) throw error;

		const { data } = error.response;

		if (data.title?.code === PB_ERROR_CODE.not_unique) {
			return new PocketbaseError(ERRORS_DATA.INVALID_POST_TITLE);
		}

		throw error;
	}

	static is(error: unknown): error is PocketbaseError {
		return error instanceof PocketbaseError;
	}
}
