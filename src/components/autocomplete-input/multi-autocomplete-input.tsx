import { X } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import ErrorDisplay from '../error-display';
import { ACOption } from './types';

type MultiAutocompleteInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'defaultValue'
> & {
	label?: string;
	error?: string | string[];
	inputValue?: string;
	onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	defaultInputValue?: string;
	value?: ACOption<string>[];
	onChange?: (newValue: ACOption<string>[]) => void;
	defaultValue?: ACOption<string>[];
	options?: ACOption<string>[];
	emptyComponent?: ReactNode;
};

export default function MultiAutocompleteInput({
	label,
	id,
	name,
	type,
	error,
	inputValue,
	onInputChange,
	defaultInputValue,
	value,
	onChange,
	defaultValue,
	options = [] as ACOption<string>[],
	emptyComponent = undefined,
}: MultiAutocompleteInputProps) {
	const isControlled = typeof value !== 'undefined';
	const isInputControlled = typeof inputValue !== 'undefined';
	const [_inputValue, _setInputValue] = useState(defaultInputValue ?? '');
	const [_value, _setValue] = useState(defaultValue ?? []);

	const filteredOptions = options.filter(
		(op) =>
			op.label
				.toLowerCase()
				.includes((inputValue ?? _inputValue).toLowerCase()) &&
			!(value ?? _value).some((x) => x.label === op.label)
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange?.(e);
		if (!isInputControlled) _setInputValue(e.target.value);
	};

	const handleValueChange = (newValue: ACOption<string>[]) => {
		onChange?.(newValue);
		if (!isControlled) _setValue(newValue);
		if (!isInputControlled) _setInputValue('');
	};

	return (
		<div id={id} className="grid w-full">
			{label && (
				<label htmlFor={id} className="mb-1">
					{label}
				</label>
			)}
			<div className="dropdown">
				<div
					className={`input input-bordered ${error && 'input-error'} flex h-auto min-h-12 flex-wrap items-center gap-2 py-2`}
				>
					{(value ?? _value).map((op) => (
						<div
							key={op.label}
							className="btn btn-neutral btn-xs cursor-default select-text"
						>
							<span className="cursor-text">{op.label}</span>
							<button
								type="button"
								onClick={() =>
									handleValueChange(
										(value ?? _value).filter(
											(val) => val.label !== op.label
										)
									)
								}
							>
								<X size={16} />
							</button>
						</div>
					))}
					<input
						type={type ?? 'text'}
						name={name}
						id={id}
						value={inputValue ?? _inputValue}
						onChange={handleInputChange}
						className="grow"
					/>
					<ErrorDisplay error={error} />
				</div>
				<div className="dropdown-content z-[1] mt-1 max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-100 p-2 shadow">
					<ul className="menu">
						{filteredOptions.map((option, index) => (
							<li key={option.label} className="text-lg">
								<button
									type="button"
									onClick={() =>
										handleValueChange([
											...(value ?? _value),
											option,
										])
									}
								>
									{option.label}
								</button>
							</li>
						))}
						{filteredOptions.length === 0 && (
							<li>{emptyComponent}</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
