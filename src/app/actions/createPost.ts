'use server';

import pb, { Err } from '@/pocketbase';
import { CreatePostFormSchema, safeValidate } from '@/schemas';
import { createSlug } from '@/utils';
import { redirect } from 'next/navigation';
import { getAuth } from '../queries/getAuth';

export default async function createPost(formData: FormData) {
	const value = { ...Object.fromEntries(formData) };

	const [data, error] = await safeValidate(value, CreatePostFormSchema);

	if (error) return { validationErrors: error, payload: value };

	try {
		const auth = getAuth();
		await pb.collection('posts').create({
			...data,
			slug: createSlug(data.title),
			created_by: auth.id,
			tags: data.tags?.map((tag) => tag.value),
		});

		redirect('/dashboard');
	} catch (err) {
		return {
			error: Err.posts().fromUnknown(err).message,
			payload: value,
		};
	}
}
