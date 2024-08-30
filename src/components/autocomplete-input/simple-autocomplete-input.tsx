import { ChangeEventHandler, MouseEventHandler } from 'react';
import ErrorDisplay from '../error-display';
import { AutocompleteInputProps, AutocompleteOption } from './types';
import { defaultGetOptionLabel, defaultGetOptionValue } from './utils';

export default function SimpleAutocompleteInput<T>(
	props: AutocompleteInputProps<T, false>
) {
	const {
		label,
		id,
		type,
		name,
		inputValue,
		onInputChange,
		defaultValue,
		value,
		onChange,
		error,
		options,
		getOptionLabel = defaultGetOptionLabel,
		getOptionValue = defaultGetOptionValue,
	} = props;
	const filteredOptions = options.filter((option) =>
		getOptionLabel(option)
			.toLowerCase()
			.includes(String(inputValue).toLowerCase())
	);
	const hasOptions = filteredOptions.length > 0;

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		onInputChange?.(event.target.value);
	};

	const handleOptionClick = (option: AutocompleteOption<T>) => {
		const handleOnClick: MouseEventHandler = (event) => {
			onInputChange?.(getOptionLabel(option));
			onChange?.(getOptionValue(option));
		};

		return handleOnClick;
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
					className={`input input-bordered ${error && 'input-error'} flex flex-wrap items-center gap-2`}
				>
					<input
						type={type ?? 'text'}
						name={name}
						value={inputValue}
						onChange={handleInputChange}
						className="grow"
					/>
					<ErrorDisplay error={error} />
				</div>
				<div className="dropdown-content z-[1] mt-1 max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-100 p-2 shadow">
					<ul tabIndex={0} className="menu">
						{hasOptions &&
							filteredOptions.map((option, index) => (
								<li
									key={getOptionLabel(option)}
									tabIndex={index + 1}
									className="text-lg"
								>
									<button
										type="button"
										onClick={handleOptionClick(option)}
									>
										{getOptionLabel(option)}
									</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}
