'use server';

import { PocketbaseError, ValidationError } from '@/errors';
import PostsService from '@/server/posts.service';
import { CreatePostPayload } from '@/types';
import { redirect } from 'next/navigation';

export async function createPost(payload: CreatePostPayload) {
	try {
		await PostsService.create(payload);
		redirect('/dashboard');
	} catch (error) {
		if (ValidationError.is<CreatePostPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}
