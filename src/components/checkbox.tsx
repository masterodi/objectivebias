import { cn } from '@/utils';
import { InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	textClassName?: string;
};

const Checkbox = ({
	label,
	textClassName,
	type,
	className,
	...rest
}: CheckboxProps) => {
	return (
		<label className="label cursor-pointer">
			{label && (
				<span className={cn('label-text', textClassName)}>{label}</span>
			)}
			<input
				type="checkbox"
				className={cn('checkbox', className)}
				{...rest}
			/>
		</label>
	);
};

export default Checkbox;
