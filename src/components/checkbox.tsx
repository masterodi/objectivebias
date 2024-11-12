import { InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const Checkbox = ({ label, type, className, ...rest }: CheckboxProps) => {
	return (
		<label className="label cursor-pointer">
			{label && <span className="label-text">{label}</span>}
			<input type="checkbox" className="checkbox" {...rest} />
		</label>
	);
};

export default Checkbox;
