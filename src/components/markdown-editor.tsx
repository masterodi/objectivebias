import { ChangeEvent, useEffect, useRef } from 'react';
import MarkdownRenderer from './markdown-renderer';

type EditorProps = {
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function MarkdownEditor({ name, value, onChange }: EditorProps) {
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
				name={name}
				value={value}
				onChange={onChange}
				className="textarea textarea-bordered textarea-md"
			/>
			<div className="prose">
				<MarkdownRenderer markdown={value} />
			</div>
		</div>
	);
}
