'use server';

import pb, { Err } from '@/pocketbase';
import { CreatePostFormSchema, safeValidate } from '@/schemas';
import { getAuth } from '@/utils';
import { redirect } from 'next/navigation';

export type ActionState = {
	payload?: Record<string, FormDataEntryValue | null>;
	validationErrors?: Record<string, string[]>;
	error?: string | null;
};

export const createPost = async (
	tags: any,
	prevState: any,
	formData: FormData
) => {
	const value = { ...Object.fromEntries(formData), tags };

	const [data, error] = await safeValidate(value, CreatePostFormSchema);

	if (error) return { validationErrors: error, payload: value };

	try {
		const auth = getAuth();

		await pb.collection('posts').create({
			...data,
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
};
