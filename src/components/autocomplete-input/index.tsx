import MultipleAutocompleteInput from './multiple-autocomplete-input';
import SimpleAutocompleteInput from './simple-autocomplete-input';

type AutocompleteInputProps = any;

export default function AutocompleteInput({
	multiple,
	...props
}: AutocompleteInputProps) {
	if (multiple) return <MultipleAutocompleteInput {...props} />;

	return <SimpleAutocompleteInput {...props} />;
}
