import getSession from '@/app/(authentication)/(queries)/getSession.query';
import getToken from '@/app/(authentication)/(queries)/getToken.query';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';
import { isTokenExpired } from 'pocketbase';
import { isModeratorRoute } from './routes';

export function withModeratorMiddleware(middleware: NextMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		if (isModeratorRoute(request.nextUrl.pathname)) {
			const token = await getToken();
			const session = await getSession();

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
