'use server';

import { PocketbaseError, UnauthorizedError, ValidationError } from '@/errors';
import AuthService from '@/server/auth.service';
import PostsService from '@/server/posts.service';
import { CreatePostPayload } from '@/types';
import { createSlug } from '@/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type Payload = { title: string; body: string; tags: string[] };

export async function createPost(payload: Payload) {
	try {
		const session = await AuthService.session();

		if (!session || !session.isModerator) throw new UnauthorizedError();

		await PostsService.create({
			...payload,
			slug: createSlug(payload.title),
			created_by: session.user.id,
		});
		revalidatePath('/dashboard');
		redirect('/dashboard');
	} catch (error) {
		if (ValidationError.is<CreatePostPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error) || UnauthorizedError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}

export async function updatePost(id: string, payload: Payload) {
	try {
		const session = await AuthService.session();

		if (!session || !session.isModerator) throw new UnauthorizedError();

		await PostsService.update(id, {
			...payload,
			slug: createSlug(payload.title),
			created_by: session.user.id,
		});
		redirect('/dashboard');
	} catch (error) {
		if (ValidationError.is<CreatePostPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error) || UnauthorizedError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}

export async function deletePost(id: string) {
	try {
		const session = await AuthService.session();

		if (!session || !session.isModerator) throw new UnauthorizedError();

		const res = await PostsService.delete(id);
		revalidatePath('/dashboard');
	} catch (error) {
		if (UnauthorizedError.is(error)) {
			return { error: error.message };
		}

		throw error;
	}
}
