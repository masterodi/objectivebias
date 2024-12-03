'use client';

import upsertTag from '@/app/(tags)/(actions)/upsertTag';
import {
	AutocompleteMultipleInputField,
	AutocompleteOption,
} from '@/components/fields/autocomplete-input-field';
import { useToast } from '@/components/toast';
import { TagCreatePayload } from '@/types';
import { Plus } from 'lucide-react';
import { ChangeEventHandler, useTransition } from 'react';

type PostTagsAutocompleteFieldProps = {
	name?: string;
	options: AutocompleteOption<string>[];
	inputValue: string;
	onInputChange: ChangeEventHandler<HTMLInputElement>;
	value: AutocompleteOption<string>[];
	onChange: (newValue: AutocompleteOption<string>[] | null) => void;
	error?: string | string[];
};

const PostTagsAutocompleteField = ({
	name,
	options,
	inputValue,
	onInputChange,
	value,
	onChange,
	error,
}: PostTagsAutocompleteFieldProps) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleCreateAndAddTag = () => {
		startTransition(async () => {
			const payload: TagCreatePayload = { name: inputValue };
			const res = await upsertTag(payload);

			if (res.error) {
				toast.error(res.error);
			}

			if (res.success) {
				toast.success('Tag created and added');
				const { name, id } = res.data;
				const newValue = [...value, { label: name, value: id }];
				onChange(newValue);
			}
		});
	};

	return (
		<AutocompleteMultipleInputField
			label="Choose tags"
			name={name}
			options={options}
			inputValue={inputValue}
			onInputChange={onInputChange}
			value={value}
			onChange={onChange}
			error={error}
			disabled={isPending}
			fallback={
				<button type="button" onClick={handleCreateAndAddTag}>
					<Plus /> Create and add tag
				</button>
			}
		/>
	);
};

export default PostTagsAutocompleteField;
