import pb from '@/pocketbase';

export default async function DashboardHome() {
	const posts = await pb
		.collection('posts')
		.getFullList({ sort: '-created' });

	return (
		<div className="mx-auto min-h-screen max-w-4xl p-8 [&>*+*]:mt-4">
			{posts.map((post) => (
				<div key={post.id} className="card bg-base-300 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">{post.title}</h2>
						<p>{post.body}</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">
								Read More
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
