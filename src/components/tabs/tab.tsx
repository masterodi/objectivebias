import { cn } from '@/utils';
import { ReactNode } from 'react';

type TabProps = {
	children: ReactNode;
	className?: string;
	active?: boolean;
};

export default function Tab({ children, className, active }: TabProps) {
	return (
		<div className={cn('tab', active && 'tab-active', className)}>
			{children}
		</div>
	);
}
