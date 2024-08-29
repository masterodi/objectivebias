'use server';

import AuthService from '@/server/auth.service';

export async function getAuthToken() {
	const token = AuthService.token();
	return token;
}

export async function getSession() {
	const model = AuthService.session();
	return model;
}
