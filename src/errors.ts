import { ClientResponseError } from 'pocketbase';

const POCKETBASE_ERROR_CODES = {
	INVALID_EMAIL: 'validation_invalid_email',
	INVALID_USERNAME: 'validation_invalid_username',
	INVALID_LENGTH_CODE: 'validation_length_out_of_range',
	PASSWORDS_MISMATCH_CODE: 'validation_values_mismatch',
	NOT_UNIQUE_CODE: 'validation_not_unique',
};

export abstract class RequestError extends Error {
	constructor(message?: string) {
		super(message ?? 'Something went wrong.');
	}
}

export class ValidationError<T extends object> extends RequestError {
	data: Partial<Record<keyof T, string[]>>;

	constructor(data: Partial<{ [k in keyof T]: string[] }>, message?: string) {
		super(message ?? 'Data format is invalid.');
		this.data = data;
	}

	serialize() {
		return { message: this.message, data: this.data };
	}
}

export abstract class PocketbaseError extends RequestError {
	constructor(message?: string) {
		super(message ?? 'Something went wrong. Please try again.');
	}

	abstract fromPocketBase(error: ClientResponseError): PocketbaseError;

	fromUnknown(error: unknown): PocketbaseError {
		if (!(error instanceof ClientResponseError)) throw error;
		return this.fromPocketBase(error);
	}
}

export class AuthError extends PocketbaseError {
	fromPocketBase(error: ClientResponseError): PocketbaseError {
		const { data } = error.response;

		if (data.email?.code === POCKETBASE_ERROR_CODES.INVALID_EMAIL) {
			return new AuthError('The email is invalid or already in use.');
		}

		if (data.username?.code === POCKETBASE_ERROR_CODES.INVALID_USERNAME) {
			return new AuthError('The username is invalid or already in use.');
		}

		if (
			data.password?.code === POCKETBASE_ERROR_CODES.INVALID_LENGTH_CODE
		) {
			return new AuthError(
				'The password length must be between 8 and 12 characters.'
			);
		}

		if (
			data.passwordConfirm?.code ===
			POCKETBASE_ERROR_CODES.PASSWORDS_MISMATCH_CODE
		) {
			return new AuthError('Passwords do not match.');
		}

		if (error.url.includes('/auth-with-password')) {
			return new AuthError(
				'Failed to authenticate. Please check your credentials and try again.'
			);
		}

		throw error;
	}
}

export class PostsError extends PocketbaseError {
	fromPocketBase(error: ClientResponseError): PocketbaseError {
		const { data } = error.response;

		if (data.title?.code === POCKETBASE_ERROR_CODES.NOT_UNIQUE_CODE) {
			return new PostsError(
				'There is already a post with this title. Please choose a different one.'
			);
		}

		throw error;
	}
}
