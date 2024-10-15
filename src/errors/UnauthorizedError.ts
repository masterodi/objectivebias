import RequestError from './RequestError';
import { ERRORS_DATA } from './utils';

export default class UnauthorizedError extends RequestError {
	constructor() {
		super(ERRORS_DATA.UNAUTHORIZED);
	}

	static is(error: unknown): error is UnauthorizedError {
		return error instanceof UnauthorizedError;
	}
}
