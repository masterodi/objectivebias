'use server';

import { AUTH_COOKIE } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function logout() {
	cookies().delete(AUTH_COOKIE);
	redirect('/');
}
