import { ClientResponseError } from 'pocketbase';

const PB_CODES = {
	invalid_email: 'validation_invalid_email',
	invalid_username: 'validation_invalid_username',
	invalid_password_length: 'validation_values_mismatch',
	passwords_mismatch: 'validation_values_mismatch',
	not_unique: 'validation_not_unique',
};

const ERRORS_DATA = {
	INVALID_DATA_FORMAT: {
		code: 'error:validation',
	},
	FAILED_AUTHENTICATION: {
		message:
			'Failed to authenticate. Please check your credentials and try again.',
		code: 'error:auth',
	},
	INVALID_EMAIL: {
		message: 'The email is invalid or already in use.',
		code: 'error:auth:invalid_email',
	},
	INVALID_USERNAME: {
		message: 'The username is invalid or already in use.',
		code: 'error:auth:invalid_username',
	},
	INVALID_PASSWORD_LENGTH: {
		message: 'The password length must be between 8 and 12 characters.',
		code: 'error:auth:invalid_password',
	},
	PASSWORDS_MISMATCH: {
		message: 'Passwords do not match.',
		code: 'error:auth:passwords_mismatch',
	},
	INVALID_POST_TITLE: {
		message:
			'There is already a post with this title. Please choose a different one.',
		code: 'error:posts:title_not_unique',
	},
} as const;

type ErrorCode = (typeof ERRORS_DATA)[keyof typeof ERRORS_DATA]['code'];

export abstract class RequestError extends Error {
	code: string;

	constructor(args?: { message?: string; code?: ErrorCode }) {
		super(args?.message ?? 'Something went wrong.');
		this.code = args?.code ?? 'error:request';
	}
}

export class ValidationError<T extends object> extends RequestError {
	data: Partial<Record<keyof T, string[]>>;

	constructor(data: Partial<{ [k in keyof T]: string[] }>, message?: string) {
		super({
			message: message ?? 'Data format is invalid.',
			code: 'error:validation',
		});
		this.data = data;
	}

	serialize() {
		return { message: this.message, data: this.data };
	}
}

export class PocketbaseError extends RequestError {
	constructor(args?: { message?: string; code?: ErrorCode }) {
		super(args);
	}

	static auth(error?: unknown) {
		if (!(error instanceof ClientResponseError)) throw error;

		const { data } = error.response;

		if (data.email?.code === PB_CODES.invalid_email) {
			return new PocketbaseError(ERRORS_DATA.INVALID_EMAIL);
		}

		if (data.username?.code === PB_CODES.invalid_username) {
			return new PocketbaseError(ERRORS_DATA.INVALID_USERNAME);
		}

		if (data.password?.code === PB_CODES.invalid_password_length) {
			return new PocketbaseError(ERRORS_DATA.INVALID_PASSWORD_LENGTH);
		}

		if (data.passwordConfirm?.code === PB_CODES.passwords_mismatch) {
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

		if (data.title?.code === PB_CODES.not_unique) {
			return new PocketbaseError(ERRORS_DATA.INVALID_POST_TITLE);
		}

		throw error;
	}
}
