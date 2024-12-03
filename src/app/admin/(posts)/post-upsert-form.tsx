'use client';

import upsertPost from '@/app/(posts)/(actions)/upsertPost';
import Button from '@/components/button';
import { AutocompleteOption } from '@/components/fields/autocomplete-input-field';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import { PostCreatePayload, PostUpsertData } from '@/types';
import { FormEventHandler, useTransition } from 'react';
import PostMarkdownEditor from './post-markdown-editor';
import PostTagsAutocompleteField from './post-tags-autocomplete-field';

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

	const handleContentChange = (newValue: string) => {
		setFields((prev) => ({
			...prev,
			body: newValue,
		}));
	};

	const handleAutocompleteFieldChange = (
		newTags: AutocompleteOption<string>[] | null
	) => {
		const tags = newTags ?? ([] as AutocompleteOption<string>[]);
		setFields((prev) => ({ ...prev, tagInput: '', tags }));
	};

	const handleUpsert: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const payload: PostCreatePayload = {
			title: fields.title,
			body: fields.body,
			tags: fields.tags.map((tag) => tag.value),
		};

		startTransition(async () => {
			const { validationError, error } = await upsertPost({
				id: post?.id,
				payload,
			});

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
				className="input-lg"
			/>
			<PostMarkdownEditor
				name="body"
				id="body-editor"
				value={fields.body}
				onChange={handleContentChange}
				error={errors?.body}
			/>
			<PostTagsAutocompleteField
				name="tagInput"
				options={tags}
				inputValue={fields.tagInput}
				onInputChange={handleFieldChange}
				value={fields.tags}
				onChange={handleAutocompleteFieldChange}
				error={errors?.tags}
			/>
			<Button type="submit" variant="accent" loading={isPending}>
				{isUpdate ? 'Update' : 'Publish'}
			</Button>
		</form>
	);
};

export default PostUpsertForm;
