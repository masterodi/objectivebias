'use client';

import Tab from '@/components/tabs/tab';
import Tablist from '@/components/tabs/tablist';
import { URLS } from '@/urls';
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
					<Link href={URLS.POSTS_VIEW_DASHBOARD} className="w-full">
						Posts
					</Link>
				</Tab>
				<Tab active={searchParams.get('view') === 'tags'}>
					<Link href={URLS.TAGS_VIEW_DASHBOARD} className="w-full">
						Tags
					</Link>
				</Tab>
			</Tablist>

			{children}
		</div>
	);
}
