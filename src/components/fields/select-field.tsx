import { cn } from '@/utils';
import { SelectHTMLAttributes } from 'react';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
	options: { label: string; value: string }[];
	label?: string;
	error?: string | string[];
};

export default function SelectField({
	options,
	label,
	error,
	value,
	onChange,
	className,
	...rest
}: SelectFieldProps) {
	return (
		<div className="grid gap-1">
			{label && <label htmlFor={rest.id}>{label}</label>}
			<select
				value={value}
				onChange={onChange}
				className={cn('select select-bordered', className)}
				{...rest}
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && (
				<div className="text-error">
					{typeof error === 'string' ?
						<p>{error}</p>
					:	error.map((err, index) => <p key={index}>{err}</p>)}
				</div>
			)}
		</div>
	);
}
