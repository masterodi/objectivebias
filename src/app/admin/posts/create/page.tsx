import getTags from '@/app/_queries/getTags.query';
import validateRequest from '@/app/_queries/validateRequest.query';
import UpsertPostForm from '@/app/admin/upsert-post-form';
import { redirect } from 'next/navigation';

export default async function CreatePost() {
	const { session } = await validateRequest();

	if (!session) {
		return redirect('/login');
	}

	const tags = (await getTags()).map((tag) => ({
		value: tag.id,
		label: tag.name,
	}));

	return (
		<div className="grid min-h-screen place-items-center">
			<UpsertPostForm options={tags} />
		</div>
	);
}
