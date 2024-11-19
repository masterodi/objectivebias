'use client';

import deleteTag from '@/app/(tags)/(actions)/deleteTag';
import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import DropdownToggler from '@/components/dropdown/dropdown-toggler';
import { useToast } from '@/components/toast';
import { Tag } from '@/types';
import { URLS } from '@/urls';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useTransition } from 'react';

const TagActionsDropdown = ({ tag }: { tag: Tag }) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeleteTag = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			const { error, success } = await deleteTag(tag.id);

			if (error) {
				toast.error(error);
			}

			if (success) {
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
							href={URLS.TAG_UPSERT(tag.id)}
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

export default TagActionsDropdown;
