import { cn } from '@/utils';
import { ButtonHTMLAttributes } from 'react';
import LoadingIndicator from './loading-indicator';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
};

const Button = ({
	children,
	loading,
	variant,
	className,
	disabled,
	...rest
}: ButtonProps) => {
	return (
		<button
			disabled={loading ?? disabled}
			className={cn(
				'btn',
				variant === 'primary' && `btn-primary`,
				variant === 'secondary' && 'btn-secondary',
				variant === 'accent' && 'btn-accent',
				variant === 'neutral' && 'btn-neutral',
				className
			)}
			{...rest}
		>
			{loading ?
				<LoadingIndicator variant={variant} />
			:	children}
		</button>
	);
};

export default Button;
