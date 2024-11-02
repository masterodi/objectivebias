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
import FormUpsertTag from '../_components/form-upsert-tag';
import ViewPosts from '../_components/view-posts';
import ViewTags from '../_components/view-tags';

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
				<ViewTags tags={tags} />
				{upsertTag && <FormUpsertTag data={tagData} />}
			</>
		);
	}

	const { 'order-by': orderBy, 'order-dir': orderDir, tag } = searchParams;
	const posts = await getPosts({ orderBy, orderDir, filter: { tag } });
	const tags = await getTags();
	return <ViewPosts posts={posts} tags={tags} />;
}
