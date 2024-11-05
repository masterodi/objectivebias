'use client';

import deleteTag from '@/app/_actions/deleteTag.action';
import getTags from '@/app/_queries/getTags.query';
import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import DropdownToggler from '@/components/dropdown/dropdown-toggler';
import { useToast } from '@/components/toast';
import { Tag } from '@/schemas';
import { CREATE_TAG_URL, getDate, UPDATE_TAG_URL } from '@/utils';
import { Edit, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useTransition } from 'react';

type ViewTagsProps = {
	tags: Awaited<ReturnType<typeof getTags>>;
};

export default function ViewTags({ tags }: ViewTagsProps) {
	const hasTags = !!tags.length;

	return (
		<div>
			{hasTags ?
				<TagsList tags={tags} />
			:	<NoTags />}

			<div className="toast">
				<Link
					href={CREATE_TAG_URL}
					className="btn btn-square btn-accent"
				>
					<Plus />
				</Link>
			</div>
		</div>
	);
}

const NoTags = () => {
	return (
		<div className="grid min-h-screen flex-1 place-items-center text-5xl">
			No tags created so far. Create one and check again.
		</div>
	);
};

const TagsList = ({ tags }: { tags: Tag[] }) => {
	return (
		<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{tags.map((tag) => (
				<CardTag key={tag.id} tag={tag} />
			))}
		</div>
	);
};

const CardTag = ({ tag }: { tag: Tag }) => {
	return (
		<div className="card bg-base-200">
			<div className="card-body">
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Name</h4>
					<span>{tag.name}</span>
				</div>
				<div className="flex justify-between gap-2">
					<h4 className="font-bold">Created At</h4>
					<span>{getDate(tag.createdAt)}</span>
				</div>
			</div>
			<div className="card-actions justify-end p-1">
				<DropdownTagActions tag={tag} />
			</div>
		</div>
	);
};

const DropdownTagActions = ({ tag }: { tag: Tag }) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeleteTag = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(async () => {
			const { error, success } = await deleteTag(tag.id);
			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag deleted');
			}
		});
	};

	return (
		<Dropdown align="end">
			<DropdownToggler />
			<DropdownContent>
				<ul tabIndex={0} className="menu">
					<li>
						<Link
							href={UPDATE_TAG_URL(tag.id)}
							className="flex gap-2"
						>
							<Edit /> Edit
						</Link>
					</li>
					<li>
						<form onSubmit={handleDeleteTag}>
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
