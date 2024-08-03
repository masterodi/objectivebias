import { InputHTMLAttributes, MouseEvent } from 'react';

export type AutocompleteOption<T> = { value: T; label: string };

type SimpleAutocompleteValue<T> = T;
type MultipleAutocompleteValue<T> = AutocompleteOption<T>[];
type AutocompleteValue<T, M extends boolean> = M extends true
	? MultipleAutocompleteValue<T>
	: SimpleAutocompleteValue<T>;

export type AutocompleteInputProps<T, M extends boolean> = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
> & {
	label?: string;
	inputValue: string;
	onInputChange: (value: string) => void;

	defaultValue?: AutocompleteValue<T, M>;
	value?: AutocompleteValue<T, M>;
	onChange?: (newValue: AutocompleteValue<T, M>) => void;
	error?: string;

	options: AutocompleteOption<T>[];
	getOptionValue?: (option: AutocompleteOption<T>) => T;
	getOptionLabel?: (option: AutocompleteOption<T>) => string;

	addOptionMessage?: string;
	onAddOptionClick?: (event: MouseEvent) => void;
};
