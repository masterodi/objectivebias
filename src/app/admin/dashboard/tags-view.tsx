'use client';

import deleteTag from '@/app/_actions/deleteTag.action';
import { useToast } from '@/components/toast';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import getTags from '../../_queries/getTags.query';

type TagsViewProps = {
	tags: Awaited<ReturnType<typeof getTags>>;
};

export default function TagsView({ tags }: TagsViewProps) {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeleteTag = (tagId: string) => {
		startTransition(async () => {
			const { error, success } = await deleteTag(tagId);
			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag deleted');
			}
		});
	};

	return (
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Created By</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{tags.map((tag) => (
					<tr key={tag.id}>
						<td>{tag.id}</td>
						<td>{tag.name}</td>
						<td>{tag.createdBy}</td>
						<td>{tag.createdAt}</td>
						<td>
							<Link
								href={`/admin/dashboard?view=tags&upsert-tag=true&tag=${tag.id}`}
								className="btn btn-ghost hover:text-warning"
							>
								<Edit />
							</Link>
						</td>
						<td>
							<form action={async () => handleDeleteTag(tag.id)}>
								<button
									type="submit"
									disabled={isPending}
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
