import getPostBySlug from '@/app/_queries/getPostBySlug.query';
import Badge from '@/components/badge';
import MarkdownRender from '@/components/markdown-editor/markdown-render';

type PostProps = {
	params: Promise<{ slug: string }>;
};

export default async function Post(props: PostProps) {
	const params = await props.params;
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return (
			<div>
				<h1 className="text-4xl font-bold">
					Post not found. It was either renamed or deleted.
				</h1>
			</div>
		);
	}

	return (
		<div>
			<header className="mb-12">
				<h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
				<div className="mb-4 flex gap-1">
					{post.tags.map((tag) => (
						<Badge key={tag.id}>{tag.name}</Badge>
					))}
				</div>
				<h6>
					{new Date(post.createdAt).toLocaleString()}, <br />
					<strong>edited:</strong>{' '}
					{new Date(post.updatedAt).toLocaleString()}
				</h6>
				<h6></h6>
			</header>

			<section className="prose">
				<MarkdownRender markdown={post.body} />
			</section>

			<div className="divider" />

			<footer className="flex gap-4 rounded-md bg-base-300 p-4">
				<div className="avatar">
					<div className="mask mask-squircle h-12 w-12">
						<img
							src="https://img.daisyui.com/images/profile/demo/2@94.webp"
							alt="Avatar Tailwind CSS Component"
						/>
					</div>
				</div>
				<h4>
					Post written by{' '}
					<span className="text-primary">{post.user.username}</span>
				</h4>
			</footer>
		</div>
	);
}
