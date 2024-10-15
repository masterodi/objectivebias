import getPostBySlug from '@/app/_queries/getPostBySlug.query';
import getTags from '@/app/_queries/getTags.query';
import validateRequest from '@/app/_queries/validateRequest.query';
import UpsertPostForm from '@/app/admin/upsert-post-form';
import { redirect } from 'next/navigation';

export default async function EditPost({ params }: any) {
	const { session } = await validateRequest();

	if (!session) {
		return redirect('/login');
	}

	const post = (await getPostBySlug(params.slug))!;
	const tags = (await getTags()).map((tag) => ({
		value: tag.id,
		label: tag.name,
	}));
	const postData = {
		id: post.id,
		title: post.title,
		body: JSON.parse(post.body),
		tags: post.tags.map((tag) => ({
			value: tag.id,
			label: tag.name,
		})),
	};

	return (
		<div className="grid min-h-screen place-items-center">
			<UpsertPostForm options={tags} data={postData} />
		</div>
	);
}
