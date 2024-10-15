'use server';

import pb from '@/pocketbase';
import { User } from '@/types';
import { getAuth } from '../auth.utils';

export default async function getSession() {
	const auth = getAuth();
	if (!auth) return undefined;
	const user = await pb.collection<User>('users').getOne(auth.user.id);
	return { user, isModerator: user.role === 'moderator' };
}
