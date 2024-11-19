'use server';

import db, { tags } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import validateRequest from '../../(users)/(queries)/validateRequest';

export default async function deleteTag(tagId: string) {
	const { session } = await validateRequest();

	if (!session) {
		return { error: 'Unauthorized' };
	}

	await db.delete(tags).where(eq(tags.id, tagId));

	revalidatePath('/admin/dashboard?view=tags');
	return { success: true };
}
