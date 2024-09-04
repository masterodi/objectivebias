import AuthService from '@/server/auth.service';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';
import { isTokenExpired } from 'pocketbase';

const PRIVATE_ROUTES = ['/dashboard'];

const isModeratorRoute = (route: string) =>
	PRIVATE_ROUTES.some((r) => route.startsWith(r));

export function withModeratorMiddleware(middleware: NextMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		if (isModeratorRoute(request.nextUrl.pathname)) {
			const token = AuthService.token();
			const session = await AuthService.session();

			if (
				!session ||
				!session.isModerator ||
				!token ||
				isTokenExpired(token)
			) {
				const url = request.nextUrl.clone();
				url.pathname = '/';
				return NextResponse.redirect(url);
			}
		}

		return middleware(request, event);
	};
}
