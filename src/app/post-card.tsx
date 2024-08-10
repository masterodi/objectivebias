import { PostSchema } from '@/schemas';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { InferType } from 'yup';

type PostCardProps = {
	post: InferType<typeof PostSchema>;
	className?: string;
};

export default function PostCard(props: PostCardProps) {
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
