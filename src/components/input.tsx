import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import ErrorDisplay from './error-display';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string | string[];
	ghost?: boolean;
};

export default function Input(props: InputProps) {
	const {
		type = 'text',
		name,
		id,
		defaultValue,
		label,
		error,
		ghost,
		className,
		...rest
	} = props;

	return (
		<div className="grid w-full">
			{label && (
				<label htmlFor={id} className="mb-1">
					{label}
				</label>
			)}
			<input
				type={type}
				name={name}
				id={id}
				className={twMerge(
					'input w-full',
					!ghost && 'input-bordered',
					ghost && 'input-ghost',
					error && 'input-error',
					className
				)}
				defaultValue={defaultValue}
				{...rest}
			/>
			<ErrorDisplay error={error} />
		</div>
	);
}
