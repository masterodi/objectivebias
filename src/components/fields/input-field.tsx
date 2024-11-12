import { cn } from '@/utils';
import { InputHTMLAttributes, ReactNode } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string | string[];
	leftContent?: ReactNode;
	rightContent?: ReactNode;
};

export default function InputField({
	label,
	error,
	className,
	type = 'text',
	leftContent,
	rightContent,
	...rest
}: InputFieldProps) {
	return (
		<div className="grid gap-1">
			{label && <label htmlFor={rest.id}>{label}</label>}
			<Input
				type={type}
				leftContent={leftContent}
				rightContent={rightContent}
				className={cn(error && 'input-error', className)}
				{...rest}
			/>
			{error && (
				<div className="text-error">
					{typeof error === 'string' ?
						<p>{error}</p>
					:	error.map((err, i) => <p key={i}>{err}</p>)}
				</div>
			)}
		</div>
	);
}

const Input = ({
	leftContent,
	rightContent,
	className,
	type = 'text',
	...rest
}: InputHTMLAttributes<HTMLInputElement> & {
	leftContent?: ReactNode;
	rightContent?: ReactNode;
}) => {
	if (leftContent || rightContent) {
		return (
			<div
				className={cn(
					'input input-bordered flex items-center gap-2',
					className
				)}
			>
				{leftContent}
				<input type={type} className="grow" {...rest} />
				{rightContent}
			</div>
		);
	}

	return (
		<input
			type={type}
			className={cn('input input-bordered', className)}
			{...rest}
		/>
	);
};
