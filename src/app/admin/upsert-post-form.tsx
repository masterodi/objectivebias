'use client';

import MultiAutocompleteInput from '@/components/autocomplete-input/multi-autocomplete-input';
import { ACOption } from '@/components/autocomplete-input/types';
import Input from '@/components/input';
import MarkdownEditor from '@/components/markdown-editor/editor';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import React, { useTransition } from 'react';
import upsertPost from '../_actions/upsertPost.action';
import upsertTag from '../_actions/upsertTag.action';

type UpsertPostFormProps = {
	options: any;
	data?: {
		id: string;
		title: string;
		body: string;
		tags: { value: string; label: string }[];
	};
};

export default function UpsertPostForm({ options, data }: UpsertPostFormProps) {
	const isUpdate = !!data;
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		title: data?.title ?? '',
		body: data?.body ?? '',
		tagInput: '',
		tags: data?.tags ?? ([] as ACOption<string>[]),
	});
	const toast = useToast();

	const handleUpsert = async () => {
		setFieldsError(null);
		const payload = {
			title: fields.title,
			body: fields.body,
			tags: fields.tags.map((tag) => tag.value),
		};
		startTransition(async () => {
			const { validationError, error } = await upsertPost({
				id: data?.id,
				payload,
			});
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});
	};

	const handleCreateAndAddTag = async (e: React.MouseEvent) => {
		const payload = { name: fields.tagInput };
		startTransition(async () => {
			const { error, success, data } = await upsertTag({ payload });
			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag created and added');
				setFields((prev) => ({
					...prev,
					tagInput: '',
					tags: [...prev.tags, { label: data.name, value: data.id }],
				}));
			}
		});
	};

	return (
		<form
			action={handleUpsert}
			className="mx-auto grid w-full max-w-5xl gap-8 p-8"
		>
			<Input
				placeholder="Post Title"
				id="title"
				name="title"
				value={fields.title}
				onChange={(e) =>
					setFields((prev) => ({
						...prev,
						title: e.target.value,
					}))
				}
				error={fieldsError?.title}
				className="input-lg text-4xl"
			/>
			<MarkdownEditor
				value={fields.body}
				onChange={(e) =>
					setFields((prev) => ({ ...prev, body: e.target.value }))
				}
			/>
			<MultiAutocompleteInput
				label="Choose tags"
				options={options}
				inputValue={fields.tagInput}
				onInputChange={(e) =>
					setFields((prev) => ({
						...prev,
						tagInput: e.target.value,
					}))
				}
				value={fields.tags}
				onChange={(newValue) => {
					setFields((prev) => ({
						...prev,
						tagInput: '',
						tags: newValue,
					}));
				}}
				error={fieldsError?.tags}
				whenEmpty={
					<button type="button" onClick={handleCreateAndAddTag}>
						+ Create and add tag
					</button>
				}
			/>
			<button
				type="submit"
				disabled={isPending}
				className="btn btn-primary"
			>
				{isUpdate ? 'Update' : 'Publish'}
			</button>
		</form>
	);
}
