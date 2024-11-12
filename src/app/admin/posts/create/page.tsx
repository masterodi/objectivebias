import getTags from '@/app/_queries/getTags.query';
import validateRequest from '@/app/_queries/validateRequest.query';
import { redirect } from 'next/navigation';
import FormUpsertPost from '../../_components/post-upsert-form';

export default async function CreatePost() {
	const { session } = await validateRequest();

	if (!session) {
		return redirect('/login');
	}

	const tags = (await getTags()).map((tag) => ({
		label: tag.name,
		value: tag.id,
	}));

	return (
		<div className="container mx-auto max-w-6xl p-4">
			<FormUpsertPost data={{ tags }} />
		</div>
	);
}
