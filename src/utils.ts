export function createSlug(value: string) {
	return value
		.trim() // remove whitespaces at the start and end of string
		.toLowerCase()
		.replace(/^-+/g, '') // remove one or more dash at the start of the string
		.replace(/[^\w-]+/g, '-') // convert any on-alphanumeric character to a dash
		.replace(/-+/g, '-') // convert consecutive dashes to singuar one
		.replace(/-+$/g, ''); // remove one or more dash at the end of the string
}
