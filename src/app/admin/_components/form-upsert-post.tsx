'use client';

import upsertPost from '@/app/_actions/upsertPost.action';
import upsertTag from '@/app/_actions/upsertTag.action';
import {
	AutocompleteMultipleInputField,
	AutocompleteOption,
} from '@/components/fields/autocomplete-input-field';
import InputField from '@/components/fields/input-field';
import MarkdownEditor from '@/components/markdown-editor';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import { Tag } from '@/schemas';
import { Plus } from 'lucide-react';
import { FormEvent, useTransition } from 'react';

type FormUpsertPostProps = {
	data: {
		tags: Tag[];
		post?: {
			id: string;
			title: string;
			body: string;
			tags: { value: string; label: string }[];
		};
	};
};

export default function FormUpsertPost({ data }: FormUpsertPostProps) {
	const { tags, post } = data;
	const isUpdate = !!post;
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		title: post?.title ?? '',
		body: post?.body ?? '',
		tagInput: '',
		tags: post?.tags ?? ([] as AutocompleteOption<string>[]),
	});
	const toast = useToast();

	const handleUpsertPost = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldsError(null);
		const payload = {
			title: fields.title,
			body: fields.body,
			tags: fields.tags.map((tag) => tag.value),
		};
		startTransition(async () => {
			const { validationError, error } = await upsertPost({
				id: post?.id,
				payload,
			});
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});
	};

	const handleCreateAndAddTag = async () => {
		startTransition(async () => {
			const { error, success, data } = await upsertTag({
				payload: { name: fields.tagInput },
			});

			if (error) {
				toast.error(error);
			} else if (success) {
				toast.success('Tag created and added');
				const newTag = { label: data.name, value: data.id };
				setFields((prev) => ({
					...prev,
					tagInput: '',
					tags: [...fields.tags, newTag],
				}));
			}
		});
	};

	return (
		<form
			onSubmit={handleUpsertPost}
			className="grid w-full max-w-5xl gap-8"
		>
			<InputField
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
			<AutocompleteMultipleInputField
				label="Choose tags"
				options={tags.map((tag) => ({
					label: tag.name,
					value: tag.id,
				}))}
				inputValue={fields.tagInput}
				onInputChange={(e) =>
					setFields((prev) => ({ ...prev, tagInput: e.target.value }))
				}
				value={fields.tags}
				onChange={(tags) =>
					setFields((prev) => ({
						...prev,
						tagInput: '',
						tags: tags ?? ([] as AutocompleteOption<string>[]),
					}))
				}
				error={fieldsError?.tags}
				fallback={
					<button type="button" onClick={handleCreateAndAddTag}>
						<Plus /> Create and add tag
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
