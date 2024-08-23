import { Options } from './types';

export function createExpand(options?: Options) {
	let expand: string | undefined;

	if (!options || !options.with) return;

	if (options.with.tags) {
		expand = 'tags';
	}

	if (options.with.created_by) {
		expand = expand ? `${expand},created_by` : 'created_by';
	}

	return expand;
}
