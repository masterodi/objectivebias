'use server';

import db, { posts, tagsToPosts } from '@/db';
import {
	CreatePostPayload,
	CreatePostPayloadSchema,
	InsertPost,
	validate,
} from '@/schemas';
import { createSlug } from '@/utils';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import getPostBySlug from '../_queries/getPostBySlug.query';
import validateRequest from '../_queries/validateRequest.query';

type UpsertProps = { id?: string; payload: CreatePostPayload };

export default async function upsertPost(props: UpsertProps) {
	const { session, user } = await validateRequest();
	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	const { id, payload } = props;

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

	const upsertPostData = {
		title,
		body,
		slug,
		createdBy: user.id,
	} satisfies InsertPost;
	const upsertPostResult = await db
		.insert(posts)
		.values({ id, ...upsertPostData })
		.onConflictDoUpdate({ target: posts.id, set: upsertPostData })
		.returning();

	console.log(upsertPostResult);

	if (tags) {
		const { id: upsertId } = upsertPostResult[0];
		await db.delete(tagsToPosts).where(eq(tagsToPosts.postId, upsertId));
		const updatePostTagsResult = await db
			.insert(tagsToPosts)
			.values(tags.map((tagId) => ({ postId: upsertId, tagId })));
	}

	return redirect('/admin/dashboard?view=posts');
}
