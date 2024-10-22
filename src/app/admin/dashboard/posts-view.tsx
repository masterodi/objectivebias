'use client';

import deletePost from '@/app/_actions/deletePost.action';
import Select from '@/components/select';
import { useToast } from '@/components/toast';
import useOrderBy from '@/hooks/useOrderBy';
import { Edit, Trash2, View } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, useState, useTransition } from 'react';
import getPosts from '../../_queries/getPosts.query';

function PostsTable({ posts }: PostsViewProps) {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeletePost = (postId: string) => {
		startTransition(async () => {
			const { success, error } = await deletePost(postId);

			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Post deleted');
			}
		});
	};

	return (
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Slug</th>
					<th>Tags</th>
					<th>Created By</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody>
				{posts.map((post) => (
					<tr key={post.id}>
						<td>{post.id}</td>
						<td>{post.title}</td>
						<td>{post.slug}</td>
						<td>
							{JSON.stringify(post.tags.map((tag) => tag.name))}
						</td>
						<td>{post.createdBy}</td>
						<td>{post.createdAt}</td>
						<td>{post.updatedAt}</td>
						<td>
							<Link
								href={`/posts/${post.slug}`}
								className="btn btn-ghost hover:text-info"
							>
								<View />
							</Link>
						</td>
						<td>
							<Link
								href={`/admin/posts/${post.slug}/edit`}
								className="btn btn-ghost hover:text-info"
							>
								<Edit />
							</Link>
						</td>
						<td>
							<form
								action={async () => handleDeletePost(post.id)}
							>
								<button
									className="btn btn-ghost hover:text-error"
									disabled={isPending}
								>
									<Trash2 />
								</button>
							</form>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

const orderByOptions = [
	{ label: 'Title', value: 'title' },
	{ label: 'Title DESC', value: 'title:desc' },
	{ label: 'Slug', value: 'slug' },
	{ label: 'Slug DESC', value: 'slug:desc' },
	{ label: 'Created By', value: 'createdBy' },
	{ label: 'Created By DESC', value: 'createdBy:desc' },
	{ label: 'Created At', value: 'createdAt' },
	{ label: 'Created At DESC', value: 'createdAt:desc' },
	{ label: 'Updated At', value: 'updateAt' },
	{ label: 'Updated At DESC', value: 'updateAt:desc' },
];

type PostsViewProps = {
	posts: Awaited<ReturnType<typeof getPosts>>;
};

export default function PostsView({ posts }: PostsViewProps) {
	const orderByManager = useOrderBy();
	console.log(orderByManager.toValue());
	const [orderBy, setOrderBy] = useState(orderByManager.toValue());

	const updatePostsOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
		const orderByValue = e.target.value;
		setOrderBy(orderByValue);
		orderByManager.update(orderByValue);
	};

	if (!posts.length) {
		return (
			<div className="grid min-h-screen place-items-center text-5xl">
				No post created so far. Create one and check again.
			</div>
		);
	}

	return (
		<>
			<div>
				<Select
					value={orderBy}
					options={orderByOptions}
					onChange={updatePostsOrderBy}
				/>
			</div>
			<PostsTable posts={posts} />
		</>
	);
}
