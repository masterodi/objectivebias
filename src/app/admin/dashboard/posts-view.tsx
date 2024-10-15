'use client';

import deletePost from '@/app/_actions/deletePost.action';
import { useToast } from '@/components/toast';
import { Edit, Trash2, View } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import getPosts from '../../_queries/getPosts.query';

type PostsViewProps = {
	posts: Awaited<ReturnType<typeof getPosts>>;
};

export default function PostsView({ posts }: PostsViewProps) {
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

	if (!posts.length) {
		return (
			<div className="grid min-h-screen place-items-center text-5xl">
				No post created so far. Create one and check again.
			</div>
		);
	}

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
