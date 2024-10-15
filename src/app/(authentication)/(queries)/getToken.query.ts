'use server';

import { getAuth } from '../auth.utils';

export default async function getToken() {
	const auth = getAuth();
	return auth?.token;
}
