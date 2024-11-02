'use client';

import { DASHBOARD_POSTS_VIEW_URL, DASHBOARD_TAGS_VIEW_URL } from '@/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function ViewsTablist() {
	const searchParams = useSearchParams();
	const view = searchParams.get('view');
	const isPostsView = !view || view === 'posts';
	const isTagsView = view === 'tags';

	return (
		<div role="tablist" className="tabs-boxed tabs">
			<Link
				href={DASHBOARD_POSTS_VIEW_URL}
				role="tab"
				className={twMerge('tab', isPostsView && 'tab-active')}
			>
				Posts
			</Link>
			<Link
				href={DASHBOARD_TAGS_VIEW_URL}
				role="tab"
				className={twMerge('tab', isTagsView && 'tab-active')}
			>
				Tags
			</Link>
		</div>
	);
}
