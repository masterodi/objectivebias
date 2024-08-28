import { PocketbaseError } from '@/errors';
import pb from '@/pocketbase';
import { CreatePostPayloadSchema, safeValidate } from '@/schemas';
import { CreatePostPayload, Post } from '@/types';
import { RecordFullListOptions } from 'pocketbase';

async function getList(options?: any) {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand: options?.with?.join(','),
	};

	const data = await pb.collection('posts').getFullList(queryOptions);

	return data;
}

async function getOne(id: string, options?: any) {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand: options?.with?.join(','),
	};

	const data = await pb.collection<Post>('posts').getOne(id, queryOptions);

	return data;
}

async function create(payload: CreatePostPayload) {
	try {
		const [data, validationError] = await safeValidate(
			payload,
			CreatePostPayloadSchema
		);

		if (validationError) throw validationError;

		const res = await pb.collection('posts').create(data);
		return { data: res };
	} catch (error) {
		throw PocketbaseError.posts(error);
	}
}

const PostsService = {
	getList,
	getOne,
	create,
};

export default PostsService;
