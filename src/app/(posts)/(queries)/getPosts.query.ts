'use server';

import pb from '@/pocketbase';
import { ExpandOptions, QueryOptions, QueryResult } from '@/types';
import { RecordFullListOptions } from 'pocketbase';

export default async function getPosts<E extends ExpandOptions | undefined>(
	options?: QueryOptions<E>
) {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand:
			options?.expand ? Object.keys(options.expand).join(',') : undefined,
	};

	const data = await pb
		.collection<QueryResult<E>>('posts')
		.getFullList(queryOptions);

	return data;
}
