import { cn } from '@/utils';
import { X } from 'lucide-react';
import React, {
	InputHTMLAttributes,
	MouseEvent,
	ReactNode,
	useRef,
	useState,
} from 'react';

export type AutocompleteOption<T> = { label: string; value: T };

type AutocompleteInputFieldProps<T, M = false> = {
	options: AutocompleteOption<T>[];
	label?: string;
	error?: string | string[];
	inputValue?: string;
	onInputChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
	defaultInputValue?: string;
	value?: M extends true ? AutocompleteOption<T>[] : AutocompleteOption<T>;
	onChange?: (
		newValue:
			| (M extends true ? AutocompleteOption<T>[] : AutocompleteOption<T>)
			| null
	) => void;
	defaultValue?: M extends true ? AutocompleteOption<T>[]
	:	AutocompleteOption<T>;
	id?: string;
	name?: string;
};

export function AutocompleteInputFieldProps<T>({
	options,
	label,
	error,
	inputValue,
	onInputChange,
	defaultInputValue,
	value,
	onChange,
	defaultValue,
	id,
	name,
}: AutocompleteInputFieldProps<T>) {
	const isControlled = typeof inputValue !== 'undefined';
	const isInputControlled = typeof value !== 'undefined';
	const [_inputValue, _setInputValue] = useState(defaultInputValue ?? '');
	const [_value, _setValue] = useState(defaultValue ?? null);
	const _filteredOptions = options.filter((option) =>
		option.label
			.toLowerCase()
			.includes((inputValue ?? _inputValue).toLowerCase())
	);

	const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange?.(e);
		if (!isInputControlled) _setInputValue(e.target.value);
	};

	const _handleValueChange = (newValue: AutocompleteOption<T> | null) => {
		onChange?.(newValue);
		if (!isControlled) _setValue(newValue);
		if (!isInputControlled) _setInputValue(newValue?.label ?? '');
	};

	return (
		<div id={id} className="grid gap-1">
			{label && <label htmlFor={id}>{label}</label>}
			<div className="dropdown">
				<div
					className={cn(
						`input input-bordered flex flex-wrap items-center gap-2`,
						error && 'input-error'
					)}
				>
					<input
						type="text"
						name={name}
						id={id}
						value={inputValue ?? _inputValue}
						onChange={_handleInputChange}
						className="grow"
					/>
					{!!(value ?? _value) && (
						<button
							type="button"
							onClick={() => _handleValueChange(null)}
							className="btn btn-circle btn-ghost btn-sm hover:text-error"
						>
							<X />
						</button>
					)}
					{error && (
						<div className="text-error">
							{typeof error === 'string' ?
								<p>{error}</p>
							:	error.map((err, i) => <p key={i}>{err}</p>)}
						</div>
					)}
				</div>
				<div className="dropdown-content z-[1] max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-200 p-2 shadow">
					<AutocompleteMenu
						options={_filteredOptions}
						onSelectOption={_handleValueChange}
					/>
				</div>
			</div>
		</div>
	);
}

export function AutocompleteMultipleInputField<T>({
	options,
	label,
	error,
	inputValue,
	onInputChange,
	defaultInputValue,
	value,
	onChange,
	defaultValue,
	id,
	name,
	fallback,
}: AutocompleteInputFieldProps<T, true> & { fallback?: ReactNode }) {
	const isControlled = typeof value !== 'undefined';
	const isInputControlled = typeof inputValue !== 'undefined';
	const [_inputValue, _setInputValue] = useState(defaultInputValue ?? '');
	const [_value, _setValue] = useState(defaultValue ?? []);
	const _filteredOptions = options.filter((option) => {
		return (
			option.label
				.toLowerCase()
				.includes((inputValue ?? _inputValue).toLowerCase()) &&
			!(value ?? _value).some((x) => x.label === option.label)
		);
	});
	const _inputRef = useRef<HTMLInputElement>(null);

	const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onInputChange?.(e);
		if (!isInputControlled) _setInputValue(e.target.value);
	};

	const _handleValueChange = (newValue: AutocompleteOption<T>[]) => {
		onChange?.(newValue);
		if (!isControlled) _setValue(newValue);
		if (!isInputControlled) _setInputValue('');
	};

	const _handleRemoveOption = (option: AutocompleteOption<T>) => {
		const newValue = (value ?? _value).filter((val) => {
			return val.label !== option.label;
		});
		_handleValueChange(newValue);
	};

	const _handleSelectOption = (option: AutocompleteOption<T>) => {
		const newValue = [...(value ?? _value), option];
		_handleValueChange(newValue);
		_inputRef.current?.focus();
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
					role="button"
					tabIndex={0}
					className={cn(
						'input input-bordered flex h-auto min-h-12 flex-wrap items-center gap-2 py-2',
						error && 'input-error'
					)}
				>
					<SelectedOptionsList
						options={value ?? _value}
						onRemoveOption={_handleRemoveOption}
					/>
					<input
						ref={_inputRef}
						type="text"
						name={name}
						id={id}
						value={inputValue ?? _inputValue}
						onChange={_handleInputChange}
						className="grow"
					/>
					{error && (
						<div className="text-error">
							{typeof error === 'string' ?
								<p>{error}</p>
							:	error.map((err, i) => <p key={i}>{err}</p>)}
						</div>
					)}
				</div>
				<div className="dropdown-content z-[1] mt-2 max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-200 p-2 shadow">
					<AutocompleteMenu
						options={_filteredOptions}
						onSelectOption={_handleSelectOption}
						fallback={fallback}
					/>
				</div>
			</div>
		</div>
	);
}

type AutocompleteMenuProps<T> = {
	options: AutocompleteOption<T>[];
	onSelectOption: (option: AutocompleteOption<T>) => void;
	fallback?: ReactNode;
};

const AutocompleteMenu = <T,>({
	options,
	onSelectOption,
	fallback,
}: AutocompleteMenuProps<T>) => {
	return (
		<ul className="menu">
			{options.map((option, index) => (
				<li key={index} className="text-lg">
					<button
						type="button"
						onClick={() => onSelectOption(option)}
					>
						{option.label}
					</button>
				</li>
			))}
			{options.length === 0 && fallback && (
				<li className="text-lg">{fallback}</li>
			)}
		</ul>
	);
};

type OptionBadge<T> = {
	option: AutocompleteOption<T>;
	onRemove: (option: AutocompleteOption<T>) => void;
};

const OptionBadge = <T,>({ option, onRemove }: OptionBadge<T>) => {
	const _preventFocus = (e: MouseEvent) => {
		e.preventDefault();
	};

	const _handleRemove = () => {
		onRemove(option);
	};

	return (
		<div className="btn btn-neutral btn-xs cursor-default select-text">
			<span className="cursor-text">{option.label}</span>
			<button
				type="button"
				onMouseDown={_preventFocus}
				onClick={_handleRemove}
			>
				<X size={16} />
			</button>
		</div>
	);
};

type SelectedOptionsList<T> = {
	options: AutocompleteOption<T>[];
	onRemoveOption: (option: AutocompleteOption<T>) => void;
};

const SelectedOptionsList = <T,>({
	options,
	onRemoveOption,
}: SelectedOptionsList<T>) => {
	return options.map((option, index) => (
		<OptionBadge key={index} option={option} onRemove={onRemoveOption} />
	));
};
