import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardBodyProps = {
	className?: string;
	children: ReactNode;
};

export default function CardBody({ className, children }: CardBodyProps) {
	return <div className={twMerge('card-body', className)}>{children}</div>;
}
