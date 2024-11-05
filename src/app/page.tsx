import MarkdownRenderer from '@/components/markdown-renderer';
import { Post } from '@/schemas';
import { cn, getMdDescription } from '@/utils';
import Link from 'next/link';
import getPosts from './_queries/getPosts.query';

export default async function Home() {
	const posts = await getPosts({ orderBy: 'createdAt', orderDir: 'desc' });
	const hasPosts = !!posts.length;

	if (!hasPosts) {
		return (
			<div className="grid min-h-screen place-items-center text-5xl">
				No post available yet. Come back later.
			</div>
		);
	}

	const [first, ...rest] = posts.map((post) => ({
		...post,
		body: getMdDescription(post.body),
	}));

	return (
		<div className="mx-auto max-w-4xl">
			<div className="grid gap-4 lg:grid-cols-3">
				{first && <CardPost post={first} className="lg:col-span-3" />}
				{rest.map((el) => (
					<CardPost key={el.id} post={el} />
				))}
			</div>
		</div>
	);
}

const CardPost = ({ post, className }: { post: Post; className?: string }) => {
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
