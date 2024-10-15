import RichTextDisplay from '@/components/rich-text/rich-text-display';
import { Post } from '@/schemas';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import getPosts from './_queries/getPosts.query';

export const revalidate = 0;

type PostCardProps = {
	post: Post;
	className?: string;
};

function PostCard({ post, className }: PostCardProps) {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={twMerge(
				'card max-h-full bg-base-300 shadow-xl',
				className
			)}
		>
			<div className="card-body max-h-full">
				<h2 className="card-title">{post.title}</h2>
				<RichTextDisplay richText={post.body} />
				<div className="card-actions mt-auto justify-end">
					<button className="btn btn-link btn-primary">
						Read More
					</button>
				</div>
			</div>
		</Link>
	);
}

export default async function Home() {
	const posts = await getPosts();
	const [first, second, third, fourth, ...rest] = posts;
	const aside = [second, third, fourth].filter((x) => !!x);
	const hasPosts = !!posts.length;

	return (
		<main className="mx-auto my-4 min-h-screen max-w-5xl">
			{hasPosts && (
				<div>
					<div className="grid gap-4 lg:grid-cols-7 lg:grid-rows-[repeat(3,minmax(0,200px))]">
						{first && (
							<PostCard
								post={first}
								className="lg:col-span-4 lg:row-span-3"
							/>
						)}
						{aside.map((el) => (
							<PostCard
								key={el.id}
								post={el}
								className="lg:col-span-3 lg:row-span-1"
							/>
						))}
					</div>
					<div className="mt-4">
						{rest.map((el) => (
							<PostCard key={el.id} post={el} />
						))}
					</div>
				</div>
			)}

			{!hasPosts && (
				<div className="grid min-h-screen place-items-center text-5xl">
					No post available yet. Come back later.
				</div>
			)}
		</main>
	);
}
