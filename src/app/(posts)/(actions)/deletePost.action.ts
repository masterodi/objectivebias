import getSession from '@/app/(authentication)/(queries)/getSession.query';
import { UnauthorizedError } from '@/errors';
import pb from '@/pocketbase';
import { revalidatePath } from 'next/cache';

export default async function deletePost(id: string) {
	try {
		const session = await getSession();

		if (!session || !session.isModerator) throw new UnauthorizedError();

		const res = await pb.collection('posts').delete(id);

		revalidatePath('/dashboard');

		return res;
	} catch (error) {
		if (UnauthorizedError.is(error)) {
			return { error: error.message };
		}

		throw error;
	}
}
