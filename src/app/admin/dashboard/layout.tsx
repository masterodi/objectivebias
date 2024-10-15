import type { ReactNode } from 'react';
import ViewsList from './views-list';

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div>
			<ViewsList />
			<div className="min-h-screen">{children}</div>
		</div>
	);
}
