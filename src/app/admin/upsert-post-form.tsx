'use client';

import MultiAutocompleteInput from '@/components/autocomplete-input/multi-autocomplete-input';
import { ACOption } from '@/components/autocomplete-input/types';
import Input from '@/components/input';
import Editor from '@/components/rich-text/editor';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import { Value } from '@udecode/plate';
import React, { useState, useTransition } from 'react';
import upsertPost from '../_actions/upsertPost.action';
import upsertTag from '../_actions/upsertTag.action';

type UpsertPostFormProps = {
	options: any;
	data?: {
		id: string;
		title: string;
		body: Value;
		tags: { value: string; label: string }[];
	};
};

export default function UpsertPostForm({ options, data }: UpsertPostFormProps) {
	const isUpdate = !!data;
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		title: data?.title ?? '',
		body: data?.body ?? ([] as Value),
		tags: data?.tags ?? ([] as ACOption<string>[]),
	});
	const [tagInputValue, setTagInputValue] = useState('');
	const toast = useToast();

	const handleUpsert = async (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			setFieldsError(null);

			const upsertData = {
				title: fields.title,
				body: JSON.stringify(fields.body),
				tags: fields.tags.map((tag) => tag.value),
			};
			const { validationError, error } = await upsertPost({
				id: data?.id,
				payload: upsertData,
			});

			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});
	};

	const handleCreateAndAddTag = async (e: React.MouseEvent) => {
		startTransition(async () => {
			const { validationError, error, success, tagId } = await upsertTag({
				payload: { name: tagInputValue },
			});

			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag created and added');
				setFields((prev) => ({
					...prev,
					tags: [
						...prev.tags,
						{ label: tagInputValue, value: tagId },
					],
				}));
				setTagInputValue('');
			}
		});
	};

	return (
		<form
			onSubmit={handleUpsert}
			className="m-4 mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
		>
			<h1 className="text-3xl font-bold">
				{isUpdate ? 'Update Post' : 'Create a new post'}
			</h1>
			<Input
				label="Title"
				id="title"
				name="title"
				value={fields.title}
				onChange={(e) =>
					setFields((prev) => ({ ...prev, title: e.target.value }))
				}
				error={fieldsError?.title}
			/>
			<Editor
				label="Body"
				initialValue={data?.body}
				onChange={(newValue) =>
					setFields((prev) => ({ ...prev, body: newValue }))
				}
				error={fieldsError?.body}
			/>
			<MultiAutocompleteInput
				label="Tags"
				options={options}
				inputValue={tagInputValue}
				onInputChange={(e) => setTagInputValue(e.target.value)}
				value={fields.tags}
				onChange={(newValue) => {
					setFields((prev) => ({ ...prev, tags: newValue }));
					setTagInputValue('');
				}}
				error={fieldsError?.tags}
				emptyComponent={
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
