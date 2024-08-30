import {
	ChangeEventHandler,
	MouseEvent,
	MouseEventHandler,
	useRef,
} from 'react';
import ErrorDisplay from '../error-display';
import { AutocompleteInputProps, AutocompleteOption } from './types';
import { defaultGetOptionLabel, defaultGetOptionValue } from './utils';

type OptionBadgeProps<T> = {
	option: AutocompleteOption<T>;
	getOptionLabel: AutocompleteInputProps<T, true>['getOptionLabel'];
	onRemoveOption: (
		option: AutocompleteOption<T>
	) => (event: MouseEvent) => void;
};

function OptionBadge<T>(props: OptionBadgeProps<T>) {
	const {
		option,
		getOptionLabel = defaultGetOptionLabel,
		onRemoveOption,
	} = props;

	return (
		<div className="btn btn-neutral btn-xs cursor-default select-text">
			<span key={getOptionLabel(option)} className="cursor-text">
				{getOptionLabel(option)}
			</span>
			<button onClick={onRemoveOption(option)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="inline-block h-3 w-3 stroke-current"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
		</div>
	);
}

export default function MultipleAutocompleteInput<T>(
	props: AutocompleteInputProps<T, true>
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
	const dropdownRef = useRef<HTMLUListElement>(null);
	const innerValue = value ?? defaultValue;

	const filteredOptions =
		innerValue ?
			options.filter(
				(option) =>
					getOptionLabel(option)
						.toLowerCase()
						.includes(String(inputValue).toLowerCase()) &&
					!innerValue.some(
						(x) => getOptionLabel(x) === getOptionLabel(option)
					)
			)
		:	options.filter((option) =>
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
			onInputChange?.('');
			innerValue && onChange?.([...innerValue, option]);
			dropdownRef.current?.blur();
		};

		return handleOnClick;
	};

	const handleRemoveOption = (option: AutocompleteOption<T>) => {
		const handleOnClick: MouseEventHandler = (event) => {
			innerValue &&
				onChange?.(
					innerValue.filter(
						(x) => getOptionLabel(x) !== getOptionLabel(option)
					)
				);
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
					className={`input input-bordered ${error && 'input-error'} flex h-auto min-h-12 flex-wrap items-center gap-2 py-2`}
				>
					{innerValue &&
						innerValue.map((x) => (
							<OptionBadge
								key={getOptionLabel(x)}
								option={x}
								getOptionLabel={getOptionLabel}
								onRemoveOption={handleRemoveOption}
							/>
						))}
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
					<ul ref={dropdownRef} tabIndex={0} className="menu">
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
