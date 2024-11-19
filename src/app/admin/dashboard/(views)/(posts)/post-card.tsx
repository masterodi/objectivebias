import Badge from '@/components/badge';
import { PostWithTagsWithUser } from '@/types';
import { getDate } from '@/utils';
import PostActionsDropdowns from './post-actions-dropdown';

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
				<PostActionsDropdowns post={post} />
			</div>
		</div>
	);
};

export default PostCard;
