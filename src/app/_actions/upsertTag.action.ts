'use server';

import db, { tags } from '@/db';
import {
	CreateTagPayload,
	CreateTagPayloadSchema,
	InsertTag,
	validate,
} from '@/schemas';
import { createSlug } from '@/utils';
import { revalidatePath } from 'next/cache';
import getTagBySlug from '../_queries/getTagBySlug.query';
import validateRequest from '../_queries/validateRequest.query';

type UpsertTagProps = { id?: string; payload: CreateTagPayload };

export default async function upsertTag(props: UpsertTagProps) {
	const { session, user } = await validateRequest();
	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	const { id, payload } = props;

	const { data, error } = await validate(payload, CreateTagPayloadSchema);
	if (error) {
		return { validationError: error.toJson() };
	}

	const { name } = data;
	const slug = createSlug(name);

	const existingSlugTag = await getTagBySlug(slug);
	if (existingSlugTag) {
		const isSameTag = id === existingSlugTag.id;
		if (!isSameTag) {
			return { error: 'Tag name is already used' };
		}
	}

	const upsertTagData = {
		name,
		slug,
		createdBy: user.id,
	} satisfies InsertTag;
	const upsertTagResult = await db
		.insert(tags)
		.values({ id, ...upsertTagData })
		.onConflictDoUpdate({ target: tags.id, set: upsertTagData })
		.returning();

	revalidatePath('/admin/dashboard?view=tags');
	return { success: true, data: upsertTagResult[0] };
}
