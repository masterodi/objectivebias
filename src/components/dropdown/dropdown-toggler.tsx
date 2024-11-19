import { cn } from '@/utils';
import { Ellipsis } from 'lucide-react';
import { ReactNode } from 'react';

type DropdownTogglerProps = {
	children?: ReactNode;
	className?: string;
};

export default function DropdownToggler({
	children,
	className,
}: DropdownTogglerProps) {
	return (
		<summary className={cn('btn', className)}>
			{children ?? <Ellipsis />}
		</summary>
	);
}
