import { InputHTMLAttributes } from 'react';
import FormError from './form-error';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string | string[];
};

export default function FormInput(props: FormInputProps) {
	const { type, name, id, defaultValue, label, error, className, ...rest } =
		props;

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
			<FormError error={error} />
		</div>
	);
}
