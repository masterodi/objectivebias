'use server';

import { PocketbaseError, ValidationError } from '@/errors';
import PostsService from '@/server/posts.service';
import { CreatePostPayload } from '@/types';
import { createSlug } from '@/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '../queries/auth.queries';

type Payload = { title: string; body: string; tags: string[] };

export async function createPost(payload: Payload) {
	try {
		await PostsService.create({
			...payload,
			slug: createSlug(payload.title),
			created_by: (await getSession()).id,
		});
		revalidatePath('/dashboard');
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

export async function updatePost(id: string, payload: Payload) {
	try {
		await PostsService.update(id, {
			...payload,
			slug: createSlug(payload.title),
			created_by: (await getSession()).id,
		});
		revalidatePath('/dashboard');
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

export async function deletePost(id: string) {
	const res = await PostsService.delete(id);
	revalidatePath('/dashboard');
}
