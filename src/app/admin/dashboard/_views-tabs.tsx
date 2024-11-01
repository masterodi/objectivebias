'use client';

import { ViewSearchParam } from '@/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function ViewsTabs() {
	const searchParams = useSearchParams();
	const view = searchParams.get('view');
	const isPostsView = !view || view === ViewSearchParam.value.posts;
	const isTagsView = view === ViewSearchParam.value.tags;

	return (
		<div role="tablist" className="tabs-boxed tabs">
			<Link
				href={`/admin/dashboard?${ViewSearchParam.name}=${ViewSearchParam.value.posts}`}
				role="tab"
				className={twMerge('tab', isPostsView && 'tab-active')}
			>
				Posts
			</Link>
			<Link
				href={`/admin/dashboard?${ViewSearchParam.name}=${ViewSearchParam.value.tags}`}
				role="tab"
				className={twMerge('tab', isTagsView && 'tab-active')}
			>
				Tags
			</Link>
		</div>
	);
}
