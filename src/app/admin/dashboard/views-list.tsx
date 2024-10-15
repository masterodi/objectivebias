'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function ViewsList() {
	const searchParams = useSearchParams();
	const view = searchParams.get('view');
	const isPostsView = !view || view === 'posts';
	const isTagsView = view === 'tags';

	return (
		<div role="tablist" className="tabs-boxed tabs">
			<Link
				href={'/admin/dashboard?view=posts'}
				role="tab"
				className={twMerge('tab', isPostsView && 'tab-active')}
			>
				Posts
			</Link>
			<Link
				href={'/admin/dashboard?view=tags'}
				role="tab"
				className={twMerge('tab', isTagsView && 'tab-active')}
			>
				Tags
			</Link>
		</div>
	);
}
