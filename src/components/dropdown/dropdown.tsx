import { cn } from '@/utils';
import { ReactNode } from 'react';

type DropdownProps = {
	children: ReactNode;
	align?: 'end';
};

export default function Dropdown({ children, align }: DropdownProps) {
	return (
		<div className={cn('dropdown', align === 'end' && 'dropdown-end')}>
			{children}
		</div>
	);
}
