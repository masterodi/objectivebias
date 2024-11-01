import CardBody from '@/components/card/card-body';
import { Post } from '@/schemas';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import getPosts from './_queries/getPosts.query';

export default async function Home() {
	const posts = await getPosts();
	const hasPosts = !!posts.length;

	if (!hasPosts) {
		return (
			<div className="grid min-h-screen place-items-center text-5xl">
				No post available yet. Come back later.
			</div>
		);
	}

	const [first, second, third, fourth, ...rest] = posts;
	const aside = [second, third, fourth].filter((x) => !!x);

	return (
		<div>
			<div className="grid gap-4 lg:grid-cols-7 lg:grid-rows-[repeat(3,minmax(0,200px))]">
				{first && (
					<CardPost
						post={first}
						className="lg:col-span-4 lg:row-span-3"
					/>
				)}
				{aside.map((el) => (
					<CardPost
						key={el.id}
						post={el}
						className="lg:col-span-3 lg:row-span-1"
					/>
				))}
			</div>
			<div>
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

function CardPost({ className, post }: CardPostProps) {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={twMerge(
				'card max-h-full border border-transparent bg-base-200 hover:border-primary',
				className
			)}
		>
			<CardBody className="max-h-full">
				<h2 className="card-title">{post.title}</h2>
				<div className="card-actions mt-auto justify-end">
					<button className="btn btn-link btn-primary">
						Read More
					</button>
				</div>
			</CardBody>
		</Link>
	);
}
