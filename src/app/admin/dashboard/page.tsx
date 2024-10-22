import getPosts from '@/app/_queries/getPosts.query';
import getTagById from '@/app/_queries/getTagById.query';
import getTags from '@/app/_queries/getTags.query';
import { Tag } from '@/schemas';
import UpsertTagForm from '../upsert-tag-form';
import PostsView from './posts-view';
import TagsView from './tags-view';

export const revalidate = 0;

type DashboardProps = {
	searchParams: {
		view?: 'posts' | 'tags';
		'upsert-tag'?: 'true';
		tag?: string;
		orderBy?: 'title' | 'slug' | 'createdAt' | 'updatedAt';
		orderDir?: 'asc' | 'desc';
	};
};

export default async function Dashboard({ searchParams }: DashboardProps) {
	const { view } = searchParams;
	const isPostsView = !view || view === 'posts';
	const isTagsView = view === 'tags';

	if (isPostsView) {
		const { orderBy, orderDir } = searchParams;
		const posts = await getPosts({ orderBy, orderDir });
		return <PostsView posts={posts} />;
	}

	if (isTagsView) {
		const { 'upsert-tag': upsertTag, tag } = searchParams;
		const tags = await getTags();
		let tagData: Tag | undefined;
		if (tag) {
			tagData = await getTagById(tag);
		}
		return (
			<>
				<TagsView tags={tags} />
				{upsertTag && <UpsertTagForm data={tagData} />}
			</>
		);
	}

	return null;
}
