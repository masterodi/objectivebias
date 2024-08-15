import { PostSchema } from '@/schemas';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { InferType } from 'yup';
import { getPosts } from './(posts)/queries';

type PostCardProps = {
	post: InferType<typeof PostSchema>;
	className?: string;
};

function PostCard(props: PostCardProps) {
	return (
		<Link
			href={`/posts/${props.post.slug}`}
			className={twMerge(
				'card max-h-full bg-base-300 shadow-xl',
				props.className
			)}
		>
			<div className="card-body max-h-full">
				<h2 className="card-title">{props.post.title}</h2>
				<div className="line-clamp-6 max-h-full">
					<p>{props.post.body}</p>
				</div>
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
	const aside = [second, third, fourth];

	return (
		<main className="mx-auto my-4 min-h-screen max-w-5xl">
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
		</main>
	);
}
