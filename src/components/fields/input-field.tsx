import { cn } from '@/utils';
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string | string[];
};

export default function InputField({
	label,
	error,
	className,
	type = 'text',
	...rest
}: InputFieldProps) {
	return (
		<div className="grid gap-1">
			{label && <label htmlFor={rest.id}>{label}</label>}
			<input
				type={type}
				className={cn(
					'input input-bordered',
					error && 'input-error',
					className
				)}
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
