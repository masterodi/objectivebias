import { cn } from '@/utils';
import { ReactNode } from 'react';

type CenterProps = {
	children: ReactNode;
	className?: string;
};

const Center = ({ children, className }: CenterProps) => {
	return (
		<div className={cn('grid min-h-screen place-items-center', className)}>
			{children}
		</div>
	);
};

export default Center;
