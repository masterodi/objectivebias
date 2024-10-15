'use server';

import db, { posts, tagsToPosts } from '@/db';
import { DataInvalidFormatError } from '@/error';
import {
	CreatePostPayload,
	CreatePostPayloadSchema,
	validate,
} from '@/schemas';
import { createSlug } from '@/utils';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import getPostBySlug from '../_queries/getPostBySlug.query';
import validateRequest from '../_queries/validateRequest.query';

type UpsertProps = { id?: string; payload: CreatePostPayload };
type UpsertResult =
	| {
			validationError?: ReturnType<
				DataInvalidFormatError<CreatePostPayload>['toJson']
			>;
			error?: undefined;
	  }
	| { validationError?: undefined; error: string };

export default async function upsertPost(
	props: UpsertProps
): Promise<UpsertResult> {
	const { id, payload } = props;
	const { session, user } = await validateRequest();

	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	const { data, error } = await validate(payload, CreatePostPayloadSchema);
	if (error) {
		return { validationError: error.toJson() };
	}

	const { title, body, tags } = data;
	const slug = createSlug(title);

	const existingSlugPost = await getPostBySlug(slug);
	if (existingSlugPost) {
		const isSamePost = id === existingSlugPost.id;
		if (!isSamePost) {
			return { error: 'Title is already used' };
		}
	}

	const upsertData = { title, body, slug, createdBy: user.id };
	const upsertResult = await db
		.insert(posts)
		.values({ id, ...upsertData })
		.onConflictDoUpdate({ target: posts.id, set: upsertData })
		.returning({ upsertId: posts.id });

	if (tags) {
		const { upsertId } = upsertResult[0];
		await db.delete(tagsToPosts).where(eq(tagsToPosts.postId, upsertId));
		const postTagsUpdateResult = await db
			.insert(tagsToPosts)
			.values(tags.map((tagId) => ({ postId: upsertId, tagId })));
	}

	return redirect('/admin/dashboard?view=posts');
}
