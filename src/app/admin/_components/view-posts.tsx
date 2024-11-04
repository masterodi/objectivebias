'use client';

import deletePost from '@/app/_actions/deletePost.action';
import Badge from '@/components/badge';
import Card from '@/components/card';
import CardActions from '@/components/card/card-actions';
import CardBody from '@/components/card/card-body';
import Drawer from '@/components/drawer';
import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import Select from '@/components/select';
import { useToast } from '@/components/toast';
import useFilters from '@/hooks/useFilters';
import useOrderBy from '@/hooks/useOrderBy';
import { Post, Tag, User } from '@/schemas';
import { getDate } from '@/utils';
import { Edit, Settings2, Trash, View } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useTransition } from 'react';

type ViewPostsProps = {
	posts: (Post & { tags: Tag[]; user: User })[];
	tags: Tag[];
};

export default function ViewPosts({ posts, tags }: ViewPostsProps) {
	const hasPosts = !!posts.length;

	return (
		<div>
			{hasPosts ?
				<PostsList posts={posts} />
			:	<NoPosts />}

			<DrawerPostsFilters tags={tags} />
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

const PostsList = ({ posts }: { posts: ViewPostsProps['posts'] }) => {
	return (
		<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{posts.map((post) => (
				<CardPost key={post.id} post={post} />
			))}
		</div>
	);
};

const CardPost = ({ post }: { post: Post & { tags: Tag[]; user: User } }) => {
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
};

const DropdownPostActions = ({
	post,
}: {
	post: Post & { tags: Tag[]; user: User };
}) => {
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
		<Dropdown align="end">
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
			</DropdownContent>
		</Dropdown>
	);
};

type DrawerPostsFiltersProps = {
	tags: Tag[];
};

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

const DrawerPostsFilters = ({ tags }: DrawerPostsFiltersProps) => {
	const orderBy = useOrderBy();
	const { tagFilter } = useFilters();

	const updateOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
		const orderByValue = e.target.value;
		orderBy.update(orderByValue);
	};

	const updateTag = (e: ChangeEvent<HTMLInputElement>) => {
		const shouldRemove = !e.target.checked;
		const tagValue = e.target.value;
		tagFilter.pushUpdate(tagValue, {
			action: shouldRemove ? 'remove' : 'append',
		});
	};

	return (
		<Drawer
			id="posts-filters-drawer"
			toggler={
				<div className="toast">
					<div className="btn btn-square btn-accent">
						<Settings2 />
					</div>
				</div>
			}
		>
			<div className="flex flex-col gap-2 px-8 pt-4">
				<div>
					<h4 className="mb-1 font-semibold">Order by</h4>
					<Select
						value={orderBy.toValue()}
						options={orderByOptions}
						onChange={updateOrderBy}
					/>
				</div>
				<div className="divider" />
				<div>
					<h4 className="mb-1 font-semibold">Tags</h4>
					<div className="form-control">
						{tags.map((tag) => (
							<label
								key={tag.slug}
								className="label cursor-pointer"
							>
								<span className="label-text">{tag.name}</span>
								<input
									type="checkbox"
									name={tag.slug}
									value={tag.slug}
									checked={tagFilter.hasTag(tag.slug)}
									onChange={updateTag}
									className="checkbox"
								/>
							</label>
						))}
					</div>
				</div>
				<div className="divider" />
			</div>
		</Drawer>
	);
};
