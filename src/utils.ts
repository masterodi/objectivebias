export function createSlug(value: string) {
	return value
		.trim() // remove whitespaces at the start and end of string
		.toLowerCase()
		.replace(/^-+/g, '') // remove one or more dash at the start of the string
		.replace(/[^\w-]+/g, '-') // convert any on-alphanumeric character to a dash
		.replace(/-+/g, '-') // convert consecutive dashes to singuar one
		.replace(/-+$/g, ''); // remove one or more dash at the end of the string
}

export const ViewSearchParam = {
	name: 'view',
	value: {
		posts: 'posts',
		tags: 'tags',
	},
};
export const UpsertTagSearchParam = {
	name: 'upsert-tag',
	value: {
		active: 'true',
	},
};
export const UpsertIdSearchParam = {
	name: 'upsert-id',
	value: (id: string) => id,
};
export const OrderDirSearchParam = {
	name: 'order-dir',
	value: (dir: 'asc' | 'desc') => dir,
};
export const OrderBySearchParam = {
	name: 'order-by',
	value: (orderBy: string) => orderBy,
};
export const TagFilterSearchParam = {
	name: 'tag',
	value: (tag: string) => tag,
};

export const getDate = (date: string) =>
	new Date(date).toLocaleString('en-GB', {
		hour12: false,
	});
