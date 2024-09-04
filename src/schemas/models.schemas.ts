import { array, object, string } from 'yup';

export const UserSchema = object({
	id: string().required(),
	username: string().required(),
	email: string().required(),
	avatar: string().required(),
	role: string().default('user'),
	created: string().datetime().required(),
	updated: string().datetime().required(),
});

export const TagSchema = object({
	id: string().required(),
	name: string().required(),
	created: string().datetime().required(),
	updated: string().datetime().required(),
});

export const PostSchema = object({
	id: string().required(),
	title: string().required(),
	slug: string().required(),
	body: string().required(),
	created_by: string().required(),
	tags: array(string().required()).required(),
	created: string().datetime().required(),
	updated: string().datetime().required(),
});

export const ExpandTagsSchema = object({
	expand: object({ tags: array(TagSchema).required() }).required(),
});

export const ExpandUserSchema = object({
	expand: object({ created_by: UserSchema.required() }).required(),
});
