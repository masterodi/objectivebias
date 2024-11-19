import getPosts from '@/app/(posts)/(queries)/getPosts';
import getTags from '@/app/(tags)/(queries)/getTags';
import PostsFiltersDrawer from '@/app/admin/dashboard/(views)/(posts)/posts-filters-drawer';
import Center from '@/components/center';
import { postsFiltersCache, postsOrderCache } from '@/searchParams';
import { SearchParams } from 'nuqs';
import PostCard from './post-card';

type PostsViewProps = {
	searchParams: SearchParams;
};

const PostsView = async ({ searchParams }: PostsViewProps) => {
	const { by: orderBy, dir: orderDir } = postsOrderCache.parse(searchParams);
	const filter = postsFiltersCache.parse(searchParams);

	const posts = await getPosts({ orderBy, orderDir, filter });
	const arePosts = !!posts.length;
	const tags = await getTags();

	return (
		<div className="flex flex-col gap-4">
			{arePosts ?
				<div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			:	<Center>
					No post created so far. Create one and check again.
				</Center>
			}
			<PostsFiltersDrawer tags={tags} />
		</div>
	);
};

export default PostsView;
