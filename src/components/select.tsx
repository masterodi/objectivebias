import { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	options: { label: string; value: string }[];
};

export default function Select({ value, onChange, options }: SelectProps) {
	return (
		<select
			value={value}
			onChange={onChange}
			className="select select-bordered w-full max-w-xs"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
