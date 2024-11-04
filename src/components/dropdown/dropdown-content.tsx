import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type DropdownContentProps = {
	className?: string;
	children: ReactNode;
};

export default function DropdownContent({
	className,
	children,
}: DropdownContentProps) {
	return (
		<div
			tabIndex={0}
			className={twMerge(
				'dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow',
				className
			)}
		>
			{children}
		</div>
	);
}
