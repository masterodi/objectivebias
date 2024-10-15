import { SchemaValidationError } from '@/errors';
import { Schema, ValidationError as YupValidationError } from 'yup';

export async function validate<T extends object>(
	value: unknown,
	schema: Schema<T>
) {
	try {
		const data = await schema.validate(value, { abortEarly: false });
		return data;
	} catch (err) {
		if (!(err instanceof YupValidationError))
			throw new Error('Not a validation error');

		const error = {} as Partial<Record<keyof T, string[]>>;

		err.inner.forEach((el) => {
			const path = (el.path ?? 'root') as keyof T;
			if (error[path]) error[path].push(el.message);
			else error[path] = [el.message];
		});

		throw new SchemaValidationError(error);
	}
}
