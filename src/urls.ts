import { UPSERT_ID_NAME, UPSERT_NAME } from './searchParams';

export const URLS = {
	POSTS_VIEW_DASHBOARD: '/admin/dashboard?view=posts',
	TAGS_VIEW_DASHBOARD: '/admin/dashboard?view=tags',
	TAG_UPSERT: (tagId?: string) =>
		tagId ?
			`/admin/dashboard?view=tags&${UPSERT_NAME}=true`
		:	`/admin/dashboard?view=tags&${UPSERT_NAME}=true&${UPSERT_ID_NAME}=${tagId}`,
};
