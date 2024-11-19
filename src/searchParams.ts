import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	parseAsStringLiteral,
} from 'nuqs/server';

export const ORDER_DIR_NAME = 'order-dir';
export const ORDER_DIR_VALUES = ['asc', 'desc'] as const;
export const ORDER_BY_NAME = 'order-by';

export const VIEW_NAME = 'view';
export const VIEW_VALUES = ['posts', 'tags'] as const;

export const viewParsers = {
	view: parseAsStringLiteral(VIEW_VALUES).withDefault('posts'),
};

export const viewParsersUrlKeys = {
	view: VIEW_NAME,
} satisfies Partial<Record<keyof typeof viewParsers, string>>;

export const viewCache = createSearchParamsCache(viewParsers, {
	urlKeys: viewParsersUrlKeys,
});

export const POSTS_ORDER_BY_VALUES = [
	'title',
	'slug',
	'createdAt',
	'updatedAt',
] as const;

export const postsOrderParsers = {
	by: parseAsStringLiteral(POSTS_ORDER_BY_VALUES).withDefault('createdAt'),
	dir: parseAsStringLiteral(ORDER_DIR_VALUES).withDefault('desc'),
};

export const postsOrderUrlKeys = {
	by: ORDER_BY_NAME,
	dir: ORDER_DIR_NAME,
} satisfies Partial<Record<keyof typeof postsOrderParsers, string>>;

export const postsOrderCache = createSearchParamsCache(postsOrderParsers, {
	urlKeys: postsOrderUrlKeys,
});

export const TAG_FILTER_NAME = 'tag';

export const postsFiltersParsers = {
	tag: parseAsArrayOf(parseAsString),
};

export const postsFiltersUrlKeys = {
	tag: TAG_FILTER_NAME,
} satisfies Partial<Record<keyof typeof postsFiltersParsers, string>>;

export const postsFiltersCache = createSearchParamsCache(postsFiltersParsers, {
	urlKeys: postsFiltersUrlKeys,
});

export const UPSERT_NAME = 'upsert';
export const UPSERT_ID_NAME = 'upsert-id';

export const upsertModalParsers = {
	upsertActive: parseAsBoolean,
	upsertId: parseAsString,
};

export const upsertModalUrlKeys = {
	upsertActive: UPSERT_NAME,
	upsertId: UPSERT_ID_NAME,
} satisfies Partial<Record<keyof typeof upsertModalParsers, string>>;

export const upsertModalCache = createSearchParamsCache(upsertModalParsers, {
	urlKeys: upsertModalUrlKeys,
});
