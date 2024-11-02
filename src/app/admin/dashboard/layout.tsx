import type { ReactNode } from 'react';
import ViewsTablist from '../_components/views-tablist';

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div>
			<ViewsTablist />
			<div className="mt-4">{children}</div>
		</div>
	);
}
