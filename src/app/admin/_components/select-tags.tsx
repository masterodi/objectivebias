import MultiAutocompleteInput from '@/components/autocomplete-input/multi-autocomplete-input';
import { ACValue } from '@/components/autocomplete-input/types';
import { useToast } from '@/components/toast';
import { Tag } from '@/schemas';
import { ChangeEvent, useTransition } from 'react';
import upsertTag from '../../_actions/upsertTag.action';

type SelectTagsProps = {
	tags: Tag[];
	inputValue: string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: ACValue<string, true>;
	onChange: (newValue: ACValue<string, true>) => void;
	error?: string | string[];
};

export default function SelectTags({
	tags,
	inputValue,
	onInputChange,
	value,
	onChange,
	error,
}: SelectTagsProps) {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleCreateAndAddTag = async (e: React.MouseEvent) => {
		const payload = { name: inputValue };
		startTransition(async () => {
			const { error, success, data } = await upsertTag({ payload });

			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag created and added');
				onChange([...value, { label: data.name, value: data.id }]);
			}
		});
	};

	return (
		<MultiAutocompleteInput
			label="Choose tags"
			options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
			inputValue={inputValue}
			onInputChange={onInputChange}
			value={value}
			onChange={onChange}
			error={error}
			whenEmpty={
				<button type="button" onClick={handleCreateAndAddTag}>
					+ Create and add tag
				</button>
			}
		/>
	);
}
