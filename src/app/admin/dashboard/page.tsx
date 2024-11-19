import { viewCache } from '@/searchParams';
import { type SearchParams } from 'nuqs/server';
import PostsView from './(views)/(posts)/posts-view';
import TagsView from './(views)/(tags)/tags-view';

type DashboardProps = {
	searchParams: Promise<SearchParams>;
};

export default async function Dashboard(props: DashboardProps) {
	const searchParams = await props.searchParams;
	const { view } = viewCache.parse(searchParams);

	if (view === 'tags') {
		return <TagsView searchParams={searchParams} />;
	}

	return <PostsView searchParams={searchParams} />;
}
