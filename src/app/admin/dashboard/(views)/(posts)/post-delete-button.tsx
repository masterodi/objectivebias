'use client';

import deletePost from '@/app/(posts)/(actions)/deletePost';
import { useToast } from '@/components/toast';
import { Trash } from 'lucide-react';
import { FormEventHandler, useTransition } from 'react';

type PostDeleteButtonProps = {
	postId: string;
};

const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleDeletePost: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { success, error } = await deletePost(postId);

			if (error) {
				toast.error(error);
			}

			if (success) {
				toast.success('Post deleted');
			}
		});
	};

	return (
		<form onSubmit={handleDeletePost}>
			<button type="submit" disabled={isPending} className="flex gap-2">
				<Trash /> Delete
			</button>
		</form>
	);
};

export default PostDeleteButton;
