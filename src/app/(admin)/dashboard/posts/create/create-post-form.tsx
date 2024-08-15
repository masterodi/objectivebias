'use client';

import { createPost } from '@/app/(posts)/actions';
import AutocompleteInput from '@/components/autocomplete-input';
import FormInput from '@/components/form-input';
import { useToast } from '@/components/toast';
import { useActionState, useEffect, useState } from 'react';

type CreatePostFormProps = {
	options: any;
};

export default function CreatePostForm({ options }: CreatePostFormProps) {
	const [value, setValue] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [state, createPostAction] = useActionState(
		createPost.bind(null, value),
		{}
	);
	const toast = useToast();

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state]);

	return (
		<form
			action={createPostAction}
			className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
		>
			<h1 className="text-3xl font-bold">Create a new post</h1>
			<FormInput
				label="Title"
				name="title"
				defaultValue={state.payload?.title as string}
				error={state.validationErrors?.['title']?.[0]}
			/>
			<FormInput
				label="Body"
				name="body"
				defaultValue={state.payload?.body as string}
				error={state.validationErrors?.['body']?.[0]}
			/>
			<AutocompleteInput
				multiple
				label="Tags"
				id="tags-input"
				inputValue={inputValue}
				onInputChange={setInputValue}
				options={options}
				value={value}
				onChange={setValue}
				error={state.validationErrors?.['tags']?.[0]}
				addOptionMessage="+ Add a new tag"
			/>
			<button type="submit" className="btn btn-primary">
				Publish
			</button>
		</form>
	);
}
