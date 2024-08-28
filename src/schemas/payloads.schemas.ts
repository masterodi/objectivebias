import { array, object, string } from 'yup';

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

export const CreatePostPayloadSchema = object({
	title: string().required('Title is required'),
	body: string().required('Body is required'),
	tags: array(string().required())
		.required()
		.min(1, 'Please assign at least 1 tag'),
	slug: string().required(),
	created_by: string().required(),
});
