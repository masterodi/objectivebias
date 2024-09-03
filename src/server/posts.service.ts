import { PocketbaseError } from '@/errors';
import pb from '@/pocketbase';
import { CreatePostPayloadSchema, validate } from '@/schemas';
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

async function getFiltered(filters: any, options?: any) {
	const queryOptions: RecordFullListOptions = {
		sort: '-created',
		expand: options?.with?.join(','),
	};

	if (filters?.slug) {
		const data = await pb
			.collection('posts')
			.getFirstListItem(`slug="${filters.slug}"`, queryOptions);
		return data;
	}

	const data = await pb.collection<Post>('posts').getFullList();
	return data;
}

async function create(payload: CreatePostPayload) {
	try {
		const data = await validate(payload, CreatePostPayloadSchema);
		const res = await pb.collection('posts').create(data);
		return { data: res };
	} catch (error) {
		throw PocketbaseError.posts(error);
	}
}

async function update(id: string, payload: CreatePostPayload) {
	try {
		const data = await validate(payload, CreatePostPayloadSchema);
		const res = await pb.collection('posts').update(id, data);
		return { data: res };
	} catch (error) {
		throw PocketbaseError.posts(error);
	}
}

async function remove(id: string) {
	const res = await pb.collection('posts').delete(id);
	return res;
}

const PostsService = {
	getList,
	getOne,
	getFiltered,
	create,
	update,
	delete: remove,
};

export default PostsService;
