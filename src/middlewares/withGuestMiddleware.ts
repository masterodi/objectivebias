import AuthService from '@/server/auth.service';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';
import { isTokenExpired } from 'pocketbase';
import { isGuestRoute } from './routes';

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
