import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ORDER_DIR_NAME = 'order-dir';
export const ORDER_DIR = {
	asc: 'asc',
	desc: 'desc',
};
export const ORDER_BY_NAME = 'order-by';

export const TAG_FILTER_NAME = 'tag';

export const UPSERT_TAG_NAME = 'upsert-tag';
export const UPSERT_ID_NAME = 'upsert-id';

export const DASHBOARD_POSTS_VIEW_URL = '/admin/dashboard?view=posts';
export const DASHBOARD_TAGS_VIEW_URL = '/admin/dashboard?view=tags';

export const CREATE_TAG_URL = `/admin/dashboard?view=tags&${UPSERT_TAG_NAME}=true`;
export const UPDATE_TAG_URL = (tagId: string) =>
	`/admin/dashboard?view=tags&${UPSERT_TAG_NAME}=true&${UPSERT_ID_NAME}=${tagId}`;

export const cn = (...classNames: ClassValue[]) => {
	return twMerge(clsx(classNames));
};

export const getDate = (date: string) => {
	return new Date(date).toLocaleString('en-GB', {
		hour12: false,
	});
};

export const createSlug = (value: string) => {
	return value
		.trim() // remove whitespaces at the start and end of string
		.toLowerCase()
		.replace(/^-+/g, '') // remove one or more dash at the start of the string
		.replace(/[^\w-]+/g, '-') // convert any on-alphanumeric character to a dash
		.replace(/-+/g, '-') // convert consecutive dashes to singular one
		.replace(/-+$/g, ''); // remove one or more dash at the end of the string
};

const regex = {
	title: /^#\s+.+/,
	heading: /^#+\s+.+/,
};

const isTitle = (str: string) => regex.title.test(str);
const isHeading = (str: string) => regex.heading.test(str);

export const getMdTitle = (md: string) => {
	const tokens = md.split('\n');

	for (let i = 0; i < tokens.length; i++) {
		if (isTitle(tokens[i])) return tokens[i];
	}

	return '';
};

export const getMdDescription = (md: string) => {
	const tokens = md.split('\n');

	for (let i = 0; i < tokens.length; i++) {
		if (isHeading(tokens[i]) || isTitle(tokens[i])) {
			continue;
		}

		return tokens[i];
	}

	return '';
};
