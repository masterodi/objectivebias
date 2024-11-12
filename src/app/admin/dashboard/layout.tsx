'use client';

import Tab from '@/components/tabs/tab';
import Tablist from '@/components/tabs/tablist';
import { DASHBOARD_POSTS_VIEW_URL, DASHBOARD_TAGS_VIEW_URL } from '@/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const searchParams = useSearchParams();

	return (
		<div className="flex flex-col gap-4">
			<Tablist>
				<Tab active={searchParams.get('view') !== 'tags'}>
					<Link href={DASHBOARD_POSTS_VIEW_URL} className="w-full">
						Posts
					</Link>
				</Tab>
				<Tab active={searchParams.get('view') === 'tags'}>
					<Link href={DASHBOARD_TAGS_VIEW_URL} className="w-full">
						Tags
					</Link>
				</Tab>
			</Tablist>

			{children}
		</div>
	);
}
