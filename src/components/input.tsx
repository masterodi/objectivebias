import { InputHTMLAttributes } from 'react';
import ErrorDisplay from './error-display';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string | string[];
};

export default function Input(props: InputProps) {
	const {
		type = 'text',
		name,
		id,
		defaultValue,
		label,
		error,
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
				className={`input input-bordered ${error && 'input-error'} w-full`}
				defaultValue={defaultValue}
				{...rest}
			/>
			<ErrorDisplay error={error} />
		</div>
	);
}
