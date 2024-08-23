import { getAuthToken } from '@/app/queries/getAuth';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isTokenExpired } from 'pocketbase';
import { CustomMiddleware } from './chain';

const GUEST_ROUTES = ['/login', '/register'];

const isGuestRoute = (route: string) =>
	GUEST_ROUTES.some((r) => route.startsWith(r));

export function withGuestMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		if (isGuestRoute(request.nextUrl.pathname)) {
			const token = getAuthToken();

			if (token && !isTokenExpired(token)) {
				const url = request.nextUrl.clone();
				url.pathname = '/';
				return NextResponse.redirect(url);
			}
		}

		return middleware(request, event, response);
	};
}
