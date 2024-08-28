'use server';

import { PostsError } from '@/errors';
import pb from '@/pocketbase';
import { CreatePostPayloadSchema, safeValidate } from '@/schemas';
import { createSlug } from '@/utils';
import { redirect } from 'next/navigation';
import { getAuth } from '../queries/getAuth';

export default async function createPost(formData: FormData) {
	const value = { ...Object.fromEntries(formData) };

	const [data, error] = await safeValidate(value, CreatePostPayloadSchema);

	if (error) return { validationErrors: error, payload: value };

	try {
		const auth = getAuth();
		await pb.collection('posts').create({
			...data,
			slug: createSlug(data.title),
			created_by: auth.id,
		});

		redirect('/dashboard');
	} catch (err) {
		return {
			error: new PostsError().fromUnknown(err).message,
			payload: value,
		};
	}
}
