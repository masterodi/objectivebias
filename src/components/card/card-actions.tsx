import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardActionsProps = {
	end?: boolean;
	className?: string;
	children: ReactNode;
};

export default function CardActions({
	end,
	className,
	children,
}: CardActionsProps) {
	return (
		<div
			className={twMerge('card-actions', end && 'justify-end', className)}
		>
			{children}
		</div>
	);
}
