import Dropdown from '@/components/dropdown';
import DropdownContent from '@/components/dropdown/dropdown-content';
import DropdownToggler from '@/components/dropdown/dropdown-toggler';
import { PostWithTagsWithUser } from '@/types';
import { Edit, View } from 'lucide-react';
import Link from 'next/link';
import PostDeleteButton from './post-delete-button';

type PostActionsDropdownProps = {
	post: PostWithTagsWithUser;
};

const PostActionsDropdown = ({ post }: PostActionsDropdownProps) => {
	return (
		<Dropdown align="end">
			<DropdownToggler />
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
						<PostDeleteButton postId={post.id} />
					</li>
				</ul>
			</DropdownContent>
		</Dropdown>
	);
};

export default PostActionsDropdown;
