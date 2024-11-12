import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	parseAsStringLiteral,
} from 'nuqs/server';
import {
	ORDER_BY_NAME,
	ORDER_DIR_NAME,
	TAG_FILTER_NAME,
	UPSERT_ID_NAME,
	UPSERT_NAME,
} from './utils';

export const orderParsers = {
	field: parseAsString.withDefault('createdAt'),
	dir: parseAsStringLiteral(['asc', 'desc'] as const).withDefault('desc'),
};

export const orderUrlKeys = {
	field: ORDER_BY_NAME,
	dir: ORDER_DIR_NAME,
} satisfies Partial<Record<keyof typeof orderParsers, string>>;

export const orderCache = createSearchParamsCache(orderParsers, {
	urlKeys: orderUrlKeys,
});

export const postsFiltersParsers = {
	tag: parseAsArrayOf(parseAsString),
};

export const postsFiltersUrlKeys = {
	tag: TAG_FILTER_NAME,
} satisfies Partial<Record<keyof typeof postsFiltersParsers, string>>;

export const postsFiltersCache = createSearchParamsCache(postsFiltersParsers, {
	urlKeys: postsFiltersUrlKeys,
});

export const upsertModalParsers = {
	active: parseAsBoolean,
	upsertId: parseAsString,
};

export const upsertModalUrlKeys = {
	active: UPSERT_NAME,
	upsertId: UPSERT_ID_NAME,
} satisfies Partial<Record<keyof typeof upsertModalParsers, string>>;

export const upsertTagCache = createSearchParamsCache(upsertModalParsers, {
	urlKeys: upsertModalUrlKeys,
});
