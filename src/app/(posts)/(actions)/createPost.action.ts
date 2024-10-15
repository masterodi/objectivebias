'use server';

import getSession from '@/app/(authentication)/(queries)/getSession.query';
import {
	PocketbaseError,
	SchemaValidationError,
	UnauthorizedError,
} from '@/errors';
import pb from '@/pocketbase';
import { CreatePostPayloadSchema, validate } from '@/schemas';
import { CreatePostPayload } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type Payload = { title: string; body: string; tags: string[] };

export default async function createPost(payload: Payload) {
	try {
		const session = await getSession();

		if (!session || !session.isModerator) throw new UnauthorizedError();

		const data = await validate(payload, CreatePostPayloadSchema);
		await pb.collection('posts').create(data);

		revalidatePath('/dashboard');
		redirect('/dashboard');
	} catch (error) {
		if (SchemaValidationError.is<CreatePostPayload>(error)) {
			return { validation: error.serialize(), payload };
		} else if (PocketbaseError.is(error) || UnauthorizedError.is(error)) {
			return { error: error.message, payload };
		}

		throw error;
	}
}
