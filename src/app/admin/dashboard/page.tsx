import getPosts from '@/app/_queries/getPosts.query';
import getTagById from '@/app/_queries/getTagById.query';
import getTags from '@/app/_queries/getTags.query';
import { orderCache, postsFiltersCache, upsertTagCache } from '@/searchParams';
import { PostsOrderBy } from '@/types';
import { type SearchParams } from 'nuqs/server';
import FormUpsertTag from '../_components/tag-upsert-form-dialog';
import PostsView from './_posts-view';
import TagsView from './_tags-view';

type DashboardProps = {
	searchParams: Promise<SearchParams>;
};

export default async function Dashboard(props: DashboardProps) {
	const searchParams = await props.searchParams;
	const { view } = searchParams;

	if (view === 'tags') {
		const { active: upsertActive, upsertId } =
			upsertTagCache.parse(searchParams);
		const tags = await getTags();
		const tag = upsertId ? await getTagById(upsertId) : undefined;
		return (
			<>
				<TagsView data={{ tags }} />
				{upsertActive && <FormUpsertTag data={{ tag }} />}
			</>
		);
	}

	const { field: orderBy, dir: orderDir } = orderCache.parse(searchParams);
	const filter = postsFiltersCache.parse(searchParams);
	const posts = await getPosts({
		orderBy: orderBy as PostsOrderBy,
		orderDir,
		filter,
	});
	const tags = await getTags();
	return <PostsView posts={posts} tags={tags} />;
}
