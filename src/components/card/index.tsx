import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
	className?: string;
	children: ReactNode;
};

export default function Card({ className, children }: CardProps) {
	return <div className={twMerge('card', className)}>{children}</div>;
}
