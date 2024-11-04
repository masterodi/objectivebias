import getPostBySlug from '@/app/_queries/getPostBySlug.query';
import getTags from '@/app/_queries/getTags.query';
import validateRequest from '@/app/_queries/validateRequest.query';
import FormUpsertPost from '@/app/admin/_components/form-upsert-post';
import { redirect } from 'next/navigation';

type EditPostProps = {
	params: Promise<{ slug: string }>;
};

export default async function EditPost(props: EditPostProps) {
	const params = await props.params;
	const { session } = await validateRequest();

	if (!session) {
		return redirect('/login');
	}

	const post = await getPostBySlug(params.slug);

	if (!post) {
		return redirect('/admin/dashboard?view=posts');
	}

	const postData = {
		id: post.id,
		title: post.title,
		body: post.body,
		tags: post.tags.map((tag) => ({ label: tag.name, value: tag.id })),
	};
	const tags = await getTags();

	return (
		<div className="grid min-h-screen place-items-center">
			<FormUpsertPost data={{ tags, post: postData }} />
		</div>
	);
}
