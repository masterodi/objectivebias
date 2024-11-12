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
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import { PostUpsertData } from '@/types';
import { Plus } from 'lucide-react';
import { FormEventHandler, useTransition } from 'react';

const getFields = (post?: PostUpsertData['post']) => {
	const {
		title = '',
		body = '',
		tags = [] as AutocompleteOption<string>[],
	} = post ?? {};
	return { title, body, tags, tagInput: '' };
};

const PostUpsertForm = ({ data }: { data: PostUpsertData }) => {
	const { tags, post } = data ?? {};
	const isUpdate = !!post;
	const toast = useToast();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, errors, setErrors } = useFields(getFields(post));
	const handleFieldChange = useChangeEventHandler(setFields);

	const handleUpsert: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = {
			id: post?.id,
			payload: {
				title: fields.title,
				body: fields.body,
				tags: fields.tags.map((tag) => tag.value),
			},
		};

		startTransition(async () => {
			const { validationError, error } = await upsertPost(data);

			setErrors(validationError?.details);

			if (error) {
				toast.error(error);
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
			/>
			<AutocompleteMultipleInputField
				label="Choose tags"
				options={tags}
				inputValue={fields.tagInput}
				onInputChange={handleFieldChange}
				value={fields.tags}
				onChange={(tags) =>
					setFields((prev) => ({
						...prev,
						tagInput: '',
						tags: tags ?? ([] as AutocompleteOption<string>[]),
					}))
				}
				error={errors?.tags}
				fallback={
					<TagCreateButton
						value={fields.tagInput}
						onSuccess={(tag) =>
							setFields((prev) => ({
								...prev,
								tagInput: '',
								tags: [...fields.tags, tag],
							}))
						}
					/>
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
};

type TagCreateButtonProps = {
	value: string;
	onSuccess: (option: AutocompleteOption<string>) => void;
};

const TagCreateButton = ({ value, onSuccess }: TagCreateButtonProps) => {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();

	const handleCreateAndAddTag = () => {
		const data = {
			payload: { name: value },
		};

		startTransition(async () => {
			const { error, success, data: entry } = await upsertTag(data);

			if (error) {
				toast.error(error);
			}

			if (success) {
				toast.success('Tag created and added');
				onSuccess({ label: entry.name, value: entry.id });
			}
		});
	};

	return (
		<button
			type="button"
			disabled={isPending}
			onClick={handleCreateAndAddTag}
		>
			<Plus /> Create and add tag
		</button>
	);
};

export default PostUpsertForm;
