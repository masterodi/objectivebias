'use client';

import { createPost } from '@/app/actions/posts.actions';
import MultiAutocompleteInput from '@/components/autocomplete-input/multi-autocomplete-input';
import { ACOption } from '@/components/autocomplete-input/types';
import Input from '@/components/input';
import Editor from '@/components/rich-text/editor';
import { useToast } from '@/components/toast';
import { Value } from '@udecode/plate';
import React, { useEffect, useState } from 'react';

type CreatePostFormProps = {
	options: any;
};

export default function CreatePostForm({ options }: CreatePostFormProps) {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState([] as Value);
	const [tags, setTags] = useState([] as ACOption<string>[]);
	const [validation, setValidation] = useState<{
		message: string;
		data: Partial<
			Record<'title' | 'body' | 'tags' | 'slug' | 'created_by', string[]>
		>;
	}>();
	const [error, setError] = useState<string>();
	const toast = useToast();

	const handleCreatePost = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidation(undefined);
		setError(undefined);
		const res = await createPost({
			title,
			body: JSON.stringify(body),
			tags: tags.map((tag) => tag.value),
		});
		if (res?.validation) setValidation(res?.validation);
		if (res?.error) setError(res?.error);
	};

	useEffect(() => {
		if (error) toast.error(error);
	}, [error]);

	return (
		<form
			onSubmit={handleCreatePost}
			className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
		>
			<h1 className="text-3xl font-bold">Create a new post</h1>
			<Input
				label="Title"
				id="title"
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				error={validation?.data.title}
			/>
			<Editor
				label="Body"
				onChange={(newValue) => setBody(newValue)}
				error={validation?.data.body}
			/>
			<MultiAutocompleteInput
				label="Tags"
				options={options}
				value={tags}
				onChange={(newValue) => setTags(newValue)}
				error={validation?.data.tags}
			/>
			<button type="submit" className="btn btn-primary">
				Publish
			</button>
		</form>
	);
}
