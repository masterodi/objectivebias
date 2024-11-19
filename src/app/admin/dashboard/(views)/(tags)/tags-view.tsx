import getTagById from '@/app/(tags)/(queries)/getTagById';
import getTags from '@/app/(tags)/(queries)/getTags';
import Center from '@/components/center';
import { upsertModalCache } from '@/searchParams';
import { TagUpsertData } from '@/types';
import { URLS } from '@/urls';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import TagUpsertFormDialog from '../../../(tags)/tag-upsert-form-dialog';
import TagCard from './tag-card';

type TagsViewProps = {
	searchParams: SearchParams;
};

const TagsView = async ({ searchParams }: TagsViewProps) => {
	const tags = await getTags();
	const areTags = !!tags.length;

	const { upsertActive, upsertId } = upsertModalCache.parse(searchParams);
	let tagUpsertData: TagUpsertData | undefined;
	if (upsertId) {
		const tag = await getTagById(upsertId);
		tagUpsertData = { tag: { id: tag?.id, name: tag?.name ?? '' } };
	}

	return (
		<div className="flex flex-col gap-4">
			{areTags ?
				<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{tags.map((tag) => (
						<TagCard key={tag.id} tag={tag} />
					))}
				</div>
			:	<Center>
					No tags created so far. Create one and check again.
				</Center>
			}

			<div className="toast">
				<Link
					href={URLS.TAG_UPSERT()}
					className="btn btn-square btn-accent"
				>
					<Plus />
				</Link>
			</div>

			{upsertActive && <TagUpsertFormDialog data={tagUpsertData} />}
		</div>
	);
};

export default TagsView;
