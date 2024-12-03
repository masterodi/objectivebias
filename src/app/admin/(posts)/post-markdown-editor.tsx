'use client';

import uploadFile from '@/app/(posts)/(actions)/uploadFile';
import MarkdownEditor from '@/components/markdown-editor';
import { cn, insertMdImage } from '@/utils';
import { ChangeEvent, ClipboardEvent, useTransition } from 'react';

type PostMarkdownEditorProps = {
	name?: string;
	id?: string;
	value: string;
	onChange: (newValue: string) => void;
	error?: string | string[];
};

const PostMarkdownEditor = ({
	name,
	id,
	value,
	onChange,
	error,
}: PostMarkdownEditorProps) => {
	const [isPending, startTransition] = useTransition();

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	const handleContentPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
		const textarea = e.target as HTMLTextAreaElement;

		if (!e.clipboardData) return;

		const { files } = e.clipboardData;

		startTransition(async () => {
			for (const file of files) {
				const url = await uploadFile(file, file.name);
				insertMdImage(textarea, url);
				onChange(textarea.value);
			}
		});
	};

	return (
		<MarkdownEditor
			name={name}
			id={id}
			value={value}
			onChange={handleChange}
			onPaste={handleContentPaste}
			error={error}
			className={cn(isPending && 'textarea-disabled')}
		/>
	);
};

export default PostMarkdownEditor;
