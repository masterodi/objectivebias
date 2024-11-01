import getPosts from '@/app/_queries/getPosts.query';
import getTagById from '@/app/_queries/getTagById.query';
import getTags from '@/app/_queries/getTags.query';
import {
	OrderDir,
	PostsFilter,
	PostsOrderBy,
	UpsertTagIdSearchParam,
	UpsertTagSearchParam,
	ViewSearchParam,
} from '@/types';
import UpsertTagForm from '../_upsert-tag-form';
import PostsView from './_posts-view';
import TagsView from './_tags-view';

type DashboardProps = {
	searchParams: Promise<{
		view?: ViewSearchParam;
		'upsert-tag'?: UpsertTagSearchParam;
		'upsert-id'?: UpsertTagIdSearchParam;
		'order-by'?: PostsOrderBy;
		'order-dir'?: OrderDir;
		tag?: PostsFilter['tag'];
	}>;
};

export default async function Dashboard(props: DashboardProps) {
	const searchParams = await props.searchParams;
	const { view } = searchParams;

	if (view === 'tags') {
		const { 'upsert-tag': upsertTag, 'upsert-id': upsertId } = searchParams;
		const tags = await getTags();
		const tagData = upsertId ? await getTagById(upsertId) : undefined;
		return (
			<>
				<TagsView tags={tags} />
				{upsertTag && <UpsertTagForm data={tagData} />}
			</>
		);
	}

	const { 'order-by': orderBy, 'order-dir': orderDir, tag } = searchParams;
	const posts = await getPosts({ orderBy, orderDir, filter: { tag } });
	const tags = await getTags();
	return <PostsView posts={posts} tags={tags} />;
}
