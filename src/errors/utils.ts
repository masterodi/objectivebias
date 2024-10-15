export const PB_ERROR_CODE = {
	invalid_email: 'validation_invalid_email',
	invalid_username: 'validation_invalid_username',
	invalid_password_length: 'validation_values_mismatch',
	passwords_mismatch: 'validation_values_mismatch',
	not_unique: 'validation_not_unique',
};

export const ERRORS_DATA = {
	INVALID_DATA_FORMAT: {
		code: 'error:validation',
	},
	FAILED_AUTHENTICATION: {
		message:
			'Failed to authenticate. Please check your credentials and try again.',
		code: 'error:auth',
	},
	UNAUTHORIZED: {
		message: 'Unauthorized operation.',
		code: 'error:auth:unauthorized',
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

export type ErrorCode = (typeof ERRORS_DATA)[keyof typeof ERRORS_DATA]['code'];
