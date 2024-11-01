import type { ReactNode } from 'react';
import ViewsTabs from './_views-tabs';

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div>
			<ViewsTabs />
			<div className="mt-4">{children}</div>
		</div>
	);
}
