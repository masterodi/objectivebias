'use client';

import deleteTag from '@/app/_actions/deleteTag.action';
import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import DropdownToggler from '@/components/dropdown/dropdown-toggler';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import { Tag } from '@/types';
import { CREATE_TAG_URL, getDate, UPDATE_TAG_URL } from '@/utils';
import { Edit, Plus, SearchIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { FormEvent, useMemo, useTransition } from 'react';

type TagsViewProps = {
	data: {
		tags: Tag[];
	};
};

export default function TagsView({ data }: TagsViewProps) {
	const { tags } = data;
	const [searchValue, setSearchValue] = useQueryState('search', {
		defaultValue: '',
	});
	const searchedTags = useMemo(
		() =>
			tags.filter((tag) =>
				tag.name
					.trim()
					.toLowerCase()
					.includes(searchValue.trim().toLowerCase())
			),
		[searchValue, tags]
	);
	const areTags = useMemo(() => !!searchedTags.length, [searchedTags]);

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

			{areTags ?
				<TagsList tags={searchedTags} />
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
