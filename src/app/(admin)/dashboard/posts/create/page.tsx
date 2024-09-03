import UpsertPostForm from '@/app/(posts)/upsert-post-form';
import pb from '@/pocketbase';

export default async function CreatePost() {
	const data = await pb.collection('tags').getFullList();
	const tags = data.map((x) => ({ value: x.id, label: x.name }));

	return (
		<div className="grid min-h-screen place-items-center">
			<UpsertPostForm options={tags} />
		</div>
	);
}
