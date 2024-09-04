import AuthService from '@/server/auth.service';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';
import { isTokenExpired } from 'pocketbase';

const GUEST_ROUTES = ['/login', '/register'];

const isGuestRoute = (route: string) =>
	GUEST_ROUTES.some((r) => route.startsWith(r));

export default function withGuestMiddleware(middleware: NextMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		if (isGuestRoute(request.nextUrl.pathname)) {
			const token = AuthService.token();

			if (token && !isTokenExpired(token)) {
				const url = request.nextUrl.clone();
				url.pathname = '/';
				return NextResponse.redirect(url);
			}
		}

		return middleware(request, event);
	};
}
