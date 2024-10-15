'use client';

import MultiAutocompleteInput from '@/components/autocomplete-input/multi-autocomplete-input';
import { ACOption } from '@/components/autocomplete-input/types';
import Input from '@/components/input';
import Editor from '@/components/rich-text/editor';
import { useToast } from '@/components/toast';
import { PostWithTags } from '@/types';
import { Value } from '@udecode/plate';
import React, { useState } from 'react';
import createPost from './(actions)/createPost.action';
import updatePost from './(actions)/updatePost.action';

type UpsertPostFormProps = {
	options: any;
	data?: PostWithTags;
};

export default function UpsertPostForm({ options, data }: UpsertPostFormProps) {
	const [title, setTitle] = useState(data?.title ?? '');
	const [body, setBody] = useState(
		data ? JSON.parse(data.body) : ([] as Value)
	);
	const [tags, setTags] = useState(
		data ?
			data.expand.tags.map((tag) => ({ value: tag.id, label: tag.name }))
		:	([] as ACOption<string>[])
	);
	const [validation, setValidation] = useState<{
		message: string;
		data: Partial<
			Record<'title' | 'body' | 'tags' | 'slug' | 'created_by', string[]>
		>;
	}>();
	const toast = useToast();

	const handleUpsert = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidation(undefined);
		let res;
		if (!!data) {
			res = await updatePost(data.id, {
				title,
				body: JSON.stringify(body),
				tags: tags.map((tag) => tag.value),
			});
		} else {
			res = await createPost({
				title,
				body: JSON.stringify(body),
				tags: tags.map((tag) => tag.value),
			});
		}
		if (res?.validation) {
			setValidation(res?.validation);
		}
		if (res?.error) {
			toast.error(res.error);
		}
	};

	return (
		<form
			onSubmit={handleUpsert}
			className="m-4 mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
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
				initialValue={data ? body : undefined}
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
				{!!data ? 'Update' : 'Publish'}
			</button>
		</form>
	);
}
