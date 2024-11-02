import Drawer from '@/components/drawer';
import Select from '@/components/select';
import useFilters from '@/hooks/useFilters';
import useOrderBy from '@/hooks/useOrderBy';
import { Tag } from '@/schemas';
import { Settings2 } from 'lucide-react';
import { ChangeEvent } from 'react';

type PostsFiltersDrawerProps = {
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

export default function PostsFiltersDrawer({ tags }: PostsFiltersDrawerProps) {
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
}
