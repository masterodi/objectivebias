'use server';

import db, { posts, tagsToPosts } from '@/db';
import { PostCreatePayloadSchema, validate } from '@/schemas';
import { PostCreatePayload, PostInsert } from '@/types';
import { createSlug } from '@/utils';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import getPostBySlug from '../(queries)/getPostBySlug';
import validateRequest from '../../(users)/(queries)/validateRequest';

const upsertPost = async (props: {
	id?: string;
	payload: PostCreatePayload;
}) => {
	const { session, user } = await validateRequest();
	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	const { id, payload } = props;

	const { data, error } = await validate(payload, PostCreatePayloadSchema);
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
	} satisfies PostInsert;
	const upsertPostResult = await db
		.insert(posts)
		.values({ id, ...upsertPostData })
		.onConflictDoUpdate({ target: posts.id, set: upsertPostData })
		.returning();

	if (tags) {
		const { id: upsertId } = upsertPostResult[0];
		await db.delete(tagsToPosts).where(eq(tagsToPosts.postId, upsertId));
		await db
			.insert(tagsToPosts)
			.values(tags.map((tagId) => ({ postId: upsertId, tagId })));
	}

	return redirect('/admin/dashboard?view=posts');
};

export default upsertPost;
