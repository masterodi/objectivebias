'use server';

import db, { posts } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import validateRequest from '../../(users)/(queries)/validateRequest';

export default async function deletePost(postId: string) {
	const { session, user } = await validateRequest();

	if (!session || user.role !== 'moderator') {
		return { error: 'Unauthorized' };
	}

	await db.delete(posts).where(eq(posts.id, postId));

	revalidatePath('/admin/dashboard?view=posts');
	return { success: true };
}
