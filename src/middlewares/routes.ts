const GUEST_ROUTES = ['/login', '/register'];

const PRIVATE_ROUTES = [] as string[];

const MODDERATOR_ROUTES = ['/dashboard'];

export const isGuestRoute = (route: string) =>
	GUEST_ROUTES.some((r) => route.startsWith(r));

export const isPrivateRoute = (route: string) =>
	PRIVATE_ROUTES.some((r) => route.startsWith(r));

export const isModeratorRoute = (route: string) =>
	MODDERATOR_ROUTES.some((r) => route.startsWith(r));
