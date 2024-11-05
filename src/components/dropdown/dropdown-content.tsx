import { cn } from '@/utils';
import { ReactNode } from 'react';

type DropdownContentProps = {
	children: ReactNode;
	className?: string;
};

export default function DropdownContent({
	children,
	className,
}: DropdownContentProps) {
	return (
		<div
			tabIndex={0}
			className={cn(
				'dropdown-content z-[1] rounded-md bg-base-300',
				className
			)}
		>
			{children}
		</div>
	);
}
