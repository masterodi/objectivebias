'use client';

import Checkbox from '@/components/checkbox';
import Drawer from '@/components/drawer';
import SelectField from '@/components/fields/select-field';
import usePostsFilters from '@/hooks/usePostsFilters';
import usePostsOrder from '@/hooks/usePostsOrder';
import { Tag } from '@/types';
import { cn, ORDER_OPTIONS } from '@/utils';
import { Settings2 } from 'lucide-react';
import { ChangeEventHandler } from 'react';

type PostsFilterDrawerProps = { tags: Tag[] };
type TagFilterSectionProps = { tags: Tag[] };

const PostsFiltersDrawer = ({ tags }: PostsFilterDrawerProps) => {
	return (
		<Drawer
			id="posts-filters-drawer"
			toggler={
				<div className="toast">
					<label
						htmlFor="posts-filters-drawer"
						className="btn btn-square btn-accent"
					>
						<Settings2 />
					</label>
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
	const order = usePostsOrder();

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

const TagFilterSection = ({ tags }: TagFilterSectionProps) => {
	const filters = usePostsFilters();

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
						textClassName={cn(
							filters.isTagInFilter(tag.slug) &&
								'text-accent font-semibold'
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default PostsFiltersDrawer;
