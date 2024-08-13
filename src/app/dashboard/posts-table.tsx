import { PostSchema } from '@/schemas';
import { getPosts } from '../queries';

export default async function PostsTable() {
	const posts = await getPosts();
	const columns = Object.keys(
		PostSchema.fields
	) as (keyof typeof PostSchema.fields)[];

	return (
		<table className="table table-pin-cols">
			<thead>
				<tr>
					{columns.map((key) => (
						<th key={key}>{key.toUpperCase()}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{posts.map((post) => (
					<tr key={post.id}>
						{columns.map((col) => (
							<td
								key={`${post.id}-${col}`}
								className="h-[120px] max-w-60 overflow-hidden text-ellipsis whitespace-nowrap break-words"
							>
								{post[col]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
