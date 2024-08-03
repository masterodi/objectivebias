import pb from '@/pocketbase';
import CreatePostForm from './create-post-form';

export default async function CreatePost() {
	const data = await pb.collection('tags').getFullList();
	const tags = data.map((x) => ({ value: x.id, label: x.name }));

	return (
		<div className="grid min-h-screen place-items-center">
			<CreatePostForm options={tags} />
		</div>
	);
}
