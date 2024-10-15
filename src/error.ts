export class DataInvalidFormatError<T> extends Error {
	details?: Partial<Record<keyof T, string[]>>;

	constructor(details?: Partial<Record<keyof T, string[]>>) {
		super('Data has invalid format');
		this.details = details;
	}

	toJson() {
		return { message: this.message, details: this.details };
	}

	static is<T>(error: unknown): error is DataInvalidFormatError<T> {
		return error instanceof DataInvalidFormatError;
	}
}
