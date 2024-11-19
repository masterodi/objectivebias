import Center from '@/components/center';
import MarkdownRenderer from '@/components/markdown-renderer';
import { Post } from '@/types';
import { cn, getMdDescription } from '@/utils';
import Link from 'next/link';
import getPosts from './(posts)/(queries)/getPosts';

type PostItemProps = { post: Post; className?: string };

export default async function Home() {
	const posts = await getPosts({ orderBy: 'createdAt', orderDir: 'desc' });
	const hasPosts = !!posts.length;

	if (!hasPosts) {
		return (
			<Center>
				<h1>No post available yet. Come back later.</h1>
			</Center>
		);
	}

	const [first, ...rest] = posts.map((post) => ({
		...post,
		body: getMdDescription(post.body),
	}));

	return (
		<div className="mx-auto max-w-4xl">
			<div className="grid gap-4 lg:grid-cols-3">
				{first && <PostItem post={first} className="lg:col-span-3" />}
				{rest.map((el) => (
					<PostItem key={el.id} post={el} />
				))}
			</div>
		</div>
	);
}

const PostItem = ({ post, className }: PostItemProps) => {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={cn(
				'card border border-transparent bg-base-200 hover:border-primary',
				className
			)}
		>
			<div className="card-body prose">
				<header className="card-title">
					<h2>{post.title}</h2>
				</header>

				<div className="line-clamp-3 max-h-40">
					<MarkdownRenderer markdown={post.body} />
				</div>
			</div>
			<div className="card-actions justify-end">
				<button className="btn btn-link btn-primary">Read More</button>
			</div>
		</Link>
	);
};
