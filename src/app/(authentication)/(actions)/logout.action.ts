'use server';

import { redirect } from 'next/navigation';
import { setAuthCookie } from '../auth.utils';

export default async function logout() {
	setAuthCookie(null);
	redirect('/');
}
