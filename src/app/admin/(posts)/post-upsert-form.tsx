'use client';

import upsertPost from '@/app/(posts)/(actions)/upsertPost';
import upsertTag from '@/app/(tags)/(actions)/upsertTag';
import Button from '@/components/button';
import {
	AutocompleteMultipleInputField,
	AutocompleteOption,
} from '@/components/fields/autocomplete-input-field';
import InputField from '@/components/fields/input-field';
import MarkdownEditor from '@/components/markdown-editor';
import { useToast } from '@/components/toast';
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import { PostUpsertData } from '@/types';
import { Plus } from 'lucide-react';
import { FormEventHandler, useTransition } from 'react';

type PostUpsertFormProps = {
	data: PostUpsertData;
};

const PostUpsertForm = ({ data }: PostUpsertFormProps) => {
	const { tags, post } = data ?? {};
	const isUpdate = !!post;
	const toast = useToast();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, errors, setErrors } = useFields({
		title: post?.title ?? '',
		body: post?.body ?? '',
		tagInput: '',
		tags: post?.tags ?? ([] as AutocompleteOption<string>[]),
	});

	const handleFieldChange = useChangeEventHandler(setFields);

	const handleAutocompleteFieldChange = (
		newTags: AutocompleteOption<string>[] | null
	) => {
		const tags = newTags ?? ([] as AutocompleteOption<string>[]);
		setFields((prev) => ({ ...prev, tagInput: '', tags }));
	};

	const handleUpsert: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { validationError, error } = await upsertPost({
				id: post?.id,
				payload: {
					title: fields.title,
					body: fields.body,
					tags: fields.tags.map((tag) => tag.value),
				},
			});

			setErrors(validationError?.details);

			if (error) {
				toast.error(error);
			}
		});
	};

	const handleCreateAndAddTag = () => {
		startTransition(async () => {
			const res = await upsertTag({
				payload: { name: fields.tagInput },
			});

			if (res.error) {
				toast.error(res.error);
			}

			if (res.success) {
				toast.success('Tag created and added');
				handleAutocompleteFieldChange([
					...fields.tags,
					{ label: res.data.name, value: res.data.id },
				]);
			}
		});
	};

	return (
		<form onSubmit={handleUpsert} className="grid w-full max-w-5xl gap-8">
			<InputField
				placeholder="Post Title"
				id="title"
				name="title"
				value={fields.title}
				onChange={handleFieldChange}
				error={errors?.title}
				className="input-lg text-4xl"
			/>
			<MarkdownEditor
				name="body"
				value={fields.body}
				onChange={handleFieldChange}
				error={errors?.body}
			/>
			<AutocompleteMultipleInputField
				label="Choose tags"
				name="tagInput"
				options={tags}
				inputValue={fields.tagInput}
				onInputChange={handleFieldChange}
				value={fields.tags}
				onChange={handleAutocompleteFieldChange}
				error={errors?.tags}
				fallback={
					<button
						type="button"
						disabled={isPending}
						onClick={handleCreateAndAddTag}
					>
						<Plus /> Create and add tag
					</button>
				}
			/>
			<Button type="submit" variant="accent" loading={isPending}>
				{isUpdate ? 'Update' : 'Publish'}
			</Button>
		</form>
	);
};

export default PostUpsertForm;
