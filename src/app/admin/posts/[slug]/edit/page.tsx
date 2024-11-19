import getPostBySlug from '@/app/(posts)/(queries)/getPostBySlug';
import getTags from '@/app/(tags)/(queries)/getTags';
import PostUpsertForm from '@/app/admin/(posts)/post-upsert-form';
import Center from '@/components/center';
import { PostUpsertData } from '@/types';
import { URLS } from '@/urls';
import { redirect } from 'next/navigation';

type EditPostProps = {
	params: Promise<{ slug: string }>;
};

export default async function EditPost(props: EditPostProps) {
	const params = await props.params;

	const post = await getPostBySlug(params.slug);

	if (!post) {
		return redirect(URLS.POSTS_VIEW_DASHBOARD);
	}

	const tags = (await getTags()).map((tag) => ({
		label: tag.name,
		value: tag.id,
	}));

	const data: PostUpsertData = {
		tags,
		post: {
			id: post.id,
			title: post.title,
			body: post.body,
			tags: post.tags.map((tag) => ({ label: tag.name, value: tag.id })),
		},
	};

	return (
		<Center>
			<PostUpsertForm data={data} />
		</Center>
	);
}
