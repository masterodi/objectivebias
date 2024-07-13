import { chain, withAuthMiddleware, withGuestMiddleware } from './middlewares';

export const middleware = chain([withAuthMiddleware, withGuestMiddleware]);
