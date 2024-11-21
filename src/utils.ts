import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const ORDER_OPTIONS = [
	{ label: 'Title', value: 'title:asc' },
	{ label: 'Title DESC', value: 'title:desc' },
	{ label: 'Slug', value: 'slug:asc' },
	{ label: 'Slug DESC', value: 'slug:desc' },
	{ label: 'Created At', value: 'createdAt:asc' },
	{ label: 'Created At DESC', value: 'createdAt:desc' },
	{ label: 'Updated At', value: 'updatedAt:asc' },
	{ label: 'Updated At DESC', value: 'updatedAt:desc' },
];

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
