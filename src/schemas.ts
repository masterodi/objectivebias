import { array, object, Schema, string, ValidationError } from 'yup';

export async function safeValidate<T>(
	value: unknown,
	schema: Schema<T>
): Promise<[T, null] | [null, Record<string, string[]>]> {
	try {
		const data = await schema.validate(value, { abortEarly: false });
		return [data, null];
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			throw new Error('Not a validation error');
		}

		const error: Record<string, string[]> = {};

		err.inner.forEach((el) => {
			const path = el.path || 'root';
			if (error[path]) error[path].push(el.message);
			else error[path] = [el.message];
		});

		return [null, error];
	}
}

export const LoginForm = object({
	username: string().required('Username is required'),
	password: string().required('Password is required'),
});

export const RegisterForm = object({
	email: string()
		.email('Email must be a valid email')
		.required('Email is required'),
	username: string().required('Username is required'),
	password: string().required('Password is required'),
	passwordConfirm: string().required('Confirm Password is required'),
});

export const CreatePostFormSchema = object({
	title: string().required('Title is required'),
	body: string().required('Body is required'),
	tags: array(object({ value: string().required() })).min(
		1,
		'Please assign at least 1 tag'
	),
});
