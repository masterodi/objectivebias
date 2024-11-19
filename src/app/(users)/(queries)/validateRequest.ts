'use server';

import { lucia } from '@/lucia';
import { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';

type ValidateRequestResponse = Promise<
	{ user: User; session: Session } | { user: null; session: null }
>;

const validateRequest = cache(async (): ValidateRequestResponse => {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);
	// next.js throws when you attempt to set cookie when rendering page
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookieStore.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookieStore.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch {}
	return result;
});

export default validateRequest;
