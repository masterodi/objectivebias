import getTags from '@/app/(tags)/(queries)/getTags';
import Center from '@/components/center';
import { PostUpsertData } from '@/types';
import FormUpsertPost from '../../(posts)/post-upsert-form';

export default async function CreatePost() {
	const tags = (await getTags()).map((tag) => ({
		label: tag.name,
		value: tag.id,
	}));
	const data: PostUpsertData = { tags };

	return (
		<Center>
			<FormUpsertPost data={data} />
		</Center>
	);
}
