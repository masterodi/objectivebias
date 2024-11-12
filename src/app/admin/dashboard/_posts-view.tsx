'use client';

import deletePost from '@/app/_actions/deletePost.action';
import Badge from '@/components/badge';
import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import DropdownToggler from '@/components/dropdown/dropdown-toggler';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import { PostWithTagsWithUser, Tag } from '@/types';
import { getDate } from '@/utils';
import { Edit, SearchIcon, Trash, View } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { FormEventHandler, useMemo, useTransition } from 'react';
import PostsFiltersDrawer from '../_components/posts-filters-drawer';

type PostsViewProps = {
	posts: PostWithTagsWithUser[];
	tags: Tag[];
};

export default function PostsViewProps({ posts, tags }: PostsViewProps) {
	const [searchValue, setSearchValue] = useQueryState('search', {
		defaultValue: '',
	});
	const resultedPosts = useMemo(
		() =>
			posts.filter((post) =>
				post.title.toLowerCase().includes(searchValue?.toLowerCase())
			),
		[posts, searchValue]
	);
	const arePosts = !!resultedPosts.length;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<InputField
					rightContent={<SearchIcon />}
					placeholder="Search..."
					value={searchValue ?? ''}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			{arePosts ?
				<PostsList posts={resultedPosts} />
			:	<NoPosts />}

			<PostsFiltersDrawer tags={tags} />
		</div>
	);
}

const NoPosts = () => {
	return (
		<div className="grid min-h-screen flex-1 place-items-center text-5xl">
			No post created so far. Create one and check again.
		</div>
	);
};

const PostsList = ({ posts }: { posts: PostWithTagsWithUser[] }) => {
	return (
		<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};

const PostCard = ({ post }: { post: PostWithTagsWithUser }) => {
	return (
		<div className="card bg-base-200">
			<div className="card-body">
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
			</div>
			<div className="card-actions justify-end p-1">
				<PostActionsDropdown post={post} />
			</div>
		</div>
	);
};

const PostActionsDropdown = ({ post }: { post: PostWithTagsWithUser }) => {
	return (
		<Dropdown align="end">
			<DropdownToggler />
			<DropdownContent>
				<ul tabIndex={0} className="menu">
					<li>
						<Link
							href={`/posts/${post.slug}`}
							className="flex gap-2"
						>
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
						<PostDeleteButton post={post} />
					</li>
				</ul>
			</DropdownContent>
		</Dropdown>
	);
};

const PostDeleteButton = ({ post }: { post: PostWithTagsWithUser }) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeletePost: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { success, error } = await deletePost(post.id);

			if (error) {
				toast.error(error);
			}

			if (success) {
				toast.success('Post deleted');
			}
		});
	};

	return (
		<form onSubmit={handleDeletePost}>
			<button type="submit" disabled={isPending} className="flex gap-2">
				<Trash /> Delete
			</button>
		</form>
	);
};
