import UpsertPostForm from '@/app/(posts)/upsert-post-form';
import { getPostBySlug } from '@/app/queries/posts.queries';
import pb from '@/pocketbase';
import { PostWithTags } from '@/types';

export default async function EditPost({ params }: any) {
	const post = await getPostBySlug(params.slug, {
		with: ['tags'],
	});
	const tags = (await pb.collection('tags').getFullList()).map((tag) => ({
		value: tag.id,
		label: tag.name,
	}));

	return (
		<div className="grid min-h-screen place-items-center">
			<UpsertPostForm
				options={tags}
				data={post as unknown as PostWithTags}
			/>
		</div>
	);
}
