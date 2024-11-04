import MarkdownRender from '@/components/markdown-editor/markdown-render';
import { Post } from '@/schemas';
import { getMdDescription } from '@/utils';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
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

type CardPostProps = {
	className?: string;
	post: Post;
};

const CardPost = ({ className, post }: CardPostProps) => {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={twMerge(
				'card max-h-full border border-transparent bg-base-200 hover:border-primary',
				className
			)}
		>
			<div className="card-body prose">
				<h2 className="card-title">{post.title}</h2>

				<div className="line-clamp-3 max-h-40">
					<MarkdownRender markdown={post.body} />
				</div>
			</div>
			<div className="card-actions mt-auto justify-end">
				<button className="btn btn-link btn-primary">Read More</button>
			</div>
		</Link>
	);
};
