'use server';

import db, { tags } from '@/db';
import { DataInvalidFormatError } from '@/error';
import { CreateTagPayload, CreateTagPayloadSchema, validate } from '@/schemas';
import { revalidatePath } from 'next/cache';
import getTagByName from '../_queries/getTagByName.query';
import validateRequest from '../_queries/validateRequest.query';

type UpsertTagProps = { id?: string; payload: CreateTagPayload };
type UpsertTagResult =
	| {
			validationError?: ReturnType<
				DataInvalidFormatError<CreateTagPayload>['toJson']
			>;
			error?: undefined;
			success?: undefined;
			tagId?: undefined;
	  }
	| {
			validationError?: undefined;
			error: string;
			success?: undefined;
			tagId?: undefined;
	  }
	| {
			validationError?: undefined;
			error?: undefined;
			success: true;
			tagId: string;
	  };

export default async function upsertTag({
	id,
	payload,
}: UpsertTagProps): Promise<UpsertTagResult> {
	const { session, user } = await validateRequest();
	if (!session) {
		return { error: 'Unauthorized' };
	}

	const { data, error } = await validate(payload, CreateTagPayloadSchema);
	if (error) {
		return { validationError: error.toJson() };
	}

	const { name } = data;

	const existingNameTag = await getTagByName(name);
	if (existingNameTag) {
		const isSameTag = id === existingNameTag.id;
		if (!isSameTag) {
			return { error: 'Tag name is already used' };
		}
	}

	const upsertData = { name, createdBy: user.id };
	const upsertResult = await db
		.insert(tags)
		.values({ id, ...upsertData })
		.onConflictDoUpdate({ target: tags.id, set: upsertData })
		.returning({ upsertId: tags.id });

	revalidatePath('/admin/dashboard?view=tags');
	return { success: true, tagId: upsertResult[0].upsertId };
}
