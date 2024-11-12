'use client';

import Checkbox from '@/components/checkbox';
import Drawer from '@/components/drawer';
import SelectField from '@/components/fields/select-field';
import useFilters from '@/hooks/useFilters';
import useOrder from '@/hooks/useOrder';
import { Tag } from '@/types';
import { ORDER_OPTIONS } from '@/utils';
import { Settings2 } from 'lucide-react';
import { ChangeEventHandler } from 'react';

const PostsFiltersDrawer = ({ tags }: { tags: Tag[] }) => {
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
				<PostsOrderSection />
				<div className="divider" />
				<TagFilterSection tags={tags} />
				<div className="divider" />
			</div>
		</Drawer>
	);
};

const PostsOrderSection = () => {
	const order = useOrder();

	const updateOrder: ChangeEventHandler<HTMLSelectElement> = (e) => {
		order.update(e.target.value);
	};

	return (
		<div>
			<h4 className="mb-1 font-semibold">Order by</h4>
			<SelectField
				value={order.fieldValue}
				options={ORDER_OPTIONS}
				onChange={updateOrder}
			/>
		</div>
	);
};

const TagFilterSection = ({ tags }: { tags: Tag[] }) => {
	const filters = useFilters();

	const updateTagFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { checked, value } = e.target;
		filters.updateTag(value, checked ? 'append' : 'remove');
	};

	return (
		<div>
			<h4 className="mb-1 font-semibold">Tags</h4>
			<div className="form-control">
				{tags.map((tag) => (
					<Checkbox
						key={tag.id}
						label={tag.name}
						name={tag.slug}
						checked={filters.isTagInFilter(tag.slug)}
						value={tag.slug}
						onChange={updateTagFilter}
					/>
				))}
			</div>
		</div>
	);
};

export default PostsFiltersDrawer;
