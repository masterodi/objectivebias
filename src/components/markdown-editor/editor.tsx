'use client';

import { ChangeEvent, useEffect, useRef } from 'react';
import MarkdownRender from './markdown-render';

type EditorProps = {
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function MarkdownEditor({ value, onChange }: EditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = textareaRef.current!;
		textarea.style.height = textarea.scrollHeight + 'px';
		textarea.style.overflowY = 'hidden';
		const resize = () => {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		};
		textarea.addEventListener('input', resize);

		return () => {
			textarea.removeEventListener('input', resize);
		};
	}, []);

	return (
		<div className="flex w-full gap-8 [&>*]:w-full">
			<textarea
				ref={textareaRef}
				placeholder="Start typing something..."
				value={value}
				onChange={onChange}
				className="textarea textarea-bordered textarea-md"
			/>
			<div className="prose">
				<MarkdownRender markdown={value} />
			</div>
		</div>
	);
}
