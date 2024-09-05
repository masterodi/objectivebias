import { deletePost } from '@/app/actions/posts.actions';
import { getPosts } from '@/app/queries/posts.queries';
import { Post } from '@/types';
import { Edit, Trash, View } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

async function PostsTable({ posts }: { posts: Post[] }) {
	const columns = [
		'id',
		'title',
		'slug',
		'tags',
		'created',
		'updated',
	] as (keyof Post)[];

	return (
		<table className="table">
			<thead>
				<tr>
					{columns.map((key) => (
						<th key={key}>{key.toUpperCase()}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{posts.map((post) => (
					<tr key={post.id}>
						{columns.map((col) => (
							<td
								key={`${post.id}-${col}`}
								className="h-[120px] max-w-40 overflow-hidden text-ellipsis whitespace-nowrap break-words"
							>
								{post[col]}
							</td>
						))}
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
								href={`/dashboard/posts/${post.slug}`}
								className="btn btn-ghost hover:text-info"
							>
								<Edit />
							</Link>
						</td>
						<td>
							<form
								action={async () => {
									'use server';
									await deletePost(post.id);
								}}
							>
								<button
									type="submit"
									className="btn btn-ghost hover:text-error"
								>
									<Trash />
								</button>
							</form>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default async function DashboardHome() {
	const posts = await getPosts();
	const hasPosts = !!posts.length;

	return (
		<div className="mx-auto min-h-screen max-w-6xl overflow-auto p-4">
			{hasPosts && <PostsTable posts={posts} />}
			{!hasPosts && (
				<div className="grid min-h-screen place-items-center text-5xl">
					No post created so far. Create one and check again.
				</div>
			)}
		</div>
	);
}
