import { ChangeEventHandler, MouseEventHandler, useRef } from 'react';
import FormError from '../form-error';
import AutocompleteDropdownContent from './autocomplete-dropdown-content';
import { AutocompleteInputProps, AutocompleteOption } from './types';
import { defaultGetOptionLabel, defaultGetOptionValue } from './utils';

export default function SimpleAutocompleteInput<T>(
	props: AutocompleteInputProps<T, false>
) {
	const { label, id, type, name, inputValue, onInputChange } = props;
	const { defaultValue, value, onChange, error } = props;
	const {
		options,
		getOptionLabel = defaultGetOptionLabel,
		getOptionValue = defaultGetOptionValue,
		addOptionMessage,
		onAddOptionClick,
	} = props;
	const dropdownRef = useRef<HTMLUListElement>(null);

	const filteredOptions = options.filter((option) =>
		getOptionLabel(option)
			.toLowerCase()
			.includes(String(inputValue).toLowerCase())
	);

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
					<FormError error={error} />
				</div>
				<AutocompleteDropdownContent
					ref={dropdownRef}
					options={filteredOptions}
					getOptionLabel={getOptionLabel}
					onOptionClick={handleOptionClick}
					addOptionMessage={addOptionMessage}
					onAddOptionClick={onAddOptionClick}
				/>
			</div>
		</div>
	);
}
