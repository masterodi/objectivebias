import { Tag } from '@/types';
import { getDate } from '@/utils';
import TagActionsDropdown from './tag-actions-dropdown';

const TagCard = ({ tag }: { tag: Tag }) => {
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
				<TagActionsDropdown tag={tag} />
			</div>
		</div>
	);
};

export default TagCard;
