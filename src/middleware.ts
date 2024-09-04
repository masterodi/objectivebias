import { chain, withAuthMiddleware, withGuestMiddleware } from './middlewares';
import { withModeratorMiddleware } from './middlewares/withModeratorMiddleware';

export const middleware = chain([
	withAuthMiddleware,
	withModeratorMiddleware,
	withGuestMiddleware,
]);
