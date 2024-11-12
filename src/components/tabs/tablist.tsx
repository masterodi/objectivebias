import { cn } from '@/utils';
import { ReactNode } from 'react';

type TablistProps = {
	children: ReactNode;
	className?: string;
};

export default function Tablist({ children, className }: TablistProps) {
	return (
		<div role="tablist" className={cn('tabs-boxed tabs', className)}>
			{children}
		</div>
	);
}
