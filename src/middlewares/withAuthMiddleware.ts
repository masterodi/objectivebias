import AuthService from '@/server/auth.service';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isTokenExpired } from 'pocketbase';
import { CustomMiddleware } from './chain';

const PRIVATE_ROUTES = ['/dashboard'];

const isPrivateRoute = (route: string) =>
	PRIVATE_ROUTES.some((r) => route.startsWith(r));

export function withAuthMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		if (isPrivateRoute(request.nextUrl.pathname)) {
			const token = AuthService.token();

			if (!token || isTokenExpired(token)) {
				const url = request.nextUrl.clone();
				url.pathname = '/login';
				return NextResponse.redirect(url);
			}
		}

		return middleware(request, event, response);
	};
}
