'use server';

import db, { tags } from '@/db';
import { TagCreatePayloadSchema, validate } from '@/schemas';
import { TagCreatePayload, TagInsert } from '@/types';
import { createSlug } from '@/utils';
import { revalidatePath } from 'next/cache';
import getTagBySlug from '../(queries)/getTagBySlug';
import validateRequest from '../../(users)/(queries)/validateRequest';

const upsertTag = async (props: { id?: string; payload: TagCreatePayload }) => {
	const { session, user } = await validateRequest();
	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	const { id, payload } = props;

	const { data, error } = await validate(payload, TagCreatePayloadSchema);
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
	} satisfies TagInsert;
	const upsertTagResult = await db
		.insert(tags)
		.values({ id, ...upsertTagData })
		.onConflictDoUpdate({ target: tags.id, set: upsertTagData })
		.returning();

	revalidatePath('/admin/dashboard?view=tags');
	return { success: true, data: upsertTagResult[0] };
};

export default upsertTag;
