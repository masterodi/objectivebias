'use server';

import { lucia } from '@/lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import validateRequest from '../_queries/validateRequest.query';

export default async function logout() {
	const { session } = await validateRequest();

	if (!session) {
		return { error: 'Unauthorized' };
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	const cookieStore = await cookies();
	cookieStore.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/login');
}
