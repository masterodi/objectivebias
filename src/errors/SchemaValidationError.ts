import RequestError from './RequestError';

export default class SchemaValidationError<
	T extends object,
> extends RequestError {
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

	static is<R extends object>(
		error: unknown
	): error is SchemaValidationError<R> {
		return error instanceof SchemaValidationError;
	}
}
