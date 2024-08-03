import { AutocompleteOption } from './types';

export function defaultGetOptionValue<T>(option: AutocompleteOption<T>) {
	return option.value;
}

export function defaultGetOptionLabel<T>(option: AutocompleteOption<T>) {
	return option.label;
}
