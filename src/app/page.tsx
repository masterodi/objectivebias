import PostCard from './post-card';
import { getPosts } from './queries';

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
