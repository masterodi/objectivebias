import { array, object, Schema, string, ValidationError } from 'yup';
import { DataInvalidFormatError } from './error';

export const UserSchema = object({
	id: string().required(),
	email: string().required(),
	username: string().required(),
	role: string().default('user'),
	createdAt: string().datetime().required(),
	updatedAt: string().datetime().required(),
});

export const LoginPayloadSchema = object({
	username: string().required('Username is required'),
	password: string().required('Password is required'),
});

export const RegisterPayloadSchema = object({
	email: string()
		.email('Email must be a valid email')
		.required('Email is required'),
	username: string().required('Username is required'),
	password: string()
		.required('Password is required')
		.min(8, 'Password must have at least 8 characters'),
	passwordConfirm: string().required('Confirm Password is required'),
});

export const TagSchema = object({
	id: string().required(),
	name: string().required(),
	slug: string().required(),
	createdAt: string().datetime().required(),
	createdBy: string().required(),
});

export const TagCreatePayloadSchema = object({
	name: string().required('Tag name is required'),
});

export const TagUpdatePayloadSchema = object({
	name: string(),
});

export const TagUpsertDataSchema = object({
	tag: object({ id: string(), name: string().required() }),
});

export const PostSchema = object({
	id: string().required(),
	title: string().required(),
	slug: string().required(),
	body: string().required(),
	createdBy: string().required(),
	createdAt: string().datetime().required(),
	updatedAt: string().datetime().required(),
});

export const PostCreatePayloadSchema = object({
	title: string().required('Title is required'),
	body: string().required('Body is required'),
	tags: array(string().required())
		.required()
		.min(1, 'Please assign at least 1 tag'),
});

export const PostUpdatePayloadSchema = object({
	title: string(),
	body: string(),
	tags: array(string().required()),
});

export const PostUpsertDataSchema = object({
	tags: array(
		object({
			label: string().required(),
			value: string().required(),
		}).required()
	).required(),
	post: object({
		id: string().required(),
		title: string().required(),
		body: string().required(),
		tags: array(
			object({ label: string().required(), value: string().required() })
		).required(),
	}).optional(),
});

export async function validate<T extends object>(
	value: unknown,
	schema: Schema<T>
) {
	try {
		const data = await schema.validate(value, { abortEarly: false });
		return { data };
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			throw new Error('Not a validation error');
		}

		const error = {} as Partial<Record<keyof T, string[]>>;

		err.inner.forEach((el) => {
			const path = (el.path ?? 'root') as keyof T;
			if (error[path]) error[path].push(el.message);
			else error[path] = [el.message];
		});

		return { error: new DataInvalidFormatError<T>(error) };
	}
}
