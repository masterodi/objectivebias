import { cn } from '@/utils';
import { ReactNode } from 'react';

type ContainerProps = {
	children: ReactNode;
	className?: string;
};

export default function Container({ children, className }: ContainerProps) {
	return <div className={cn('container mx-auto', className)}>{children}</div>;
}
