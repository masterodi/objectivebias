'use client';

import deletePost from '@/app/_actions/deletePost.action';
import Badge from '@/components/badge';
import Card from '@/components/card';
import CardActions from '@/components/card/card-actions';
import CardBody from '@/components/card/card-body';
import { useToast } from '@/components/toast';
import { Post, Tag, User } from '@/schemas';
import { getDate } from '@/utils';
import { Edit, EllipsisVertical, Trash, View } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useTransition } from 'react';
import PostsFiltersDrawer from './_posts-filters-drawer';

type PostsViewProps = {
	posts: (Post & { tags: Tag[]; user: User })[];
	tags: Tag[];
};

export default function PostsView({ posts, tags }: PostsViewProps) {
	const hasPosts = !!posts.length;

	return (
		<div>
			{hasPosts ?
				<PostsList posts={posts} />
			:	<NoPosts />}

			<PostsFiltersDrawer tags={tags} />
		</div>
	);
}

function NoPosts() {
	return (
		<div className="grid min-h-screen flex-1 place-items-center text-5xl">
			No post created so far. Create one and check again.
		</div>
	);
}

function PostsList({ posts }: { posts: PostsViewProps['posts'] }) {
	return (
		<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{posts.map((post) => (
				<CardPost key={post.id} post={post} />
			))}
		</div>
	);
}

function CardPost({ post }: { post: Post & { tags: Tag[]; user: User } }) {
	return (
		<Card className="bg-base-200">
			<CardBody>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Title</h4>
					<span>{post.title}</span>
				</div>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Slug</h4>
					<span>{post.slug}</span>
				</div>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Tags</h4>
					<div className="flex items-center gap-1">
						{post.tags.map((tag) => (
							<Badge key={tag.id}>{tag.name}</Badge>
						))}
					</div>
				</div>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Created At</h4>
					<span>{getDate(post.createdAt)}</span>
				</div>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Updated At</h4>
					<span>{getDate(post.updatedAt)}</span>
				</div>
			</CardBody>
			<CardActions end className="p-1">
				<DropdownPostActions post={post} />
			</CardActions>
		</Card>
	);
}

function DropdownPostActions({
	post,
}: {
	post: Post & { tags: Tag[]; user: User };
}) {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeletePost = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(async () => {
			const { success, error } = await deletePost(post.id);

			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Post deleted');
			}
		});
	};

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-square btn-ghost btn-sm m-1"
			>
				<EllipsisVertical />
			</div>
			<ul
				tabIndex={0}
				className="menu dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow"
			>
				<li>
					<Link href={`/posts/${post.slug}`} className="flex gap-2">
						<View /> View
					</Link>
				</li>
				<li>
					<Link
						href={`/admin/posts/${post.slug}/edit`}
						className="flex gap-2"
					>
						<Edit /> Edit
					</Link>
				</li>
				<li>
					<form onSubmit={handleDeletePost}>
						<button
							type="submit"
							disabled={isPending}
							className="flex gap-2"
						>
							<Trash /> Delete
						</button>
					</form>
				</li>
			</ul>
		</div>
	);
}
