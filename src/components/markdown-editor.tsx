import { cn } from '@/utils';
import { ChangeEvent, useEffect, useRef } from 'react';
import MarkdownRenderer from './markdown-renderer';

type EditorProps = {
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	error?: string | string[];
};

export default function MarkdownEditor({
	name,
	value,
	onChange,
	error,
}: EditorProps) {
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
		<div className="grid gap-1">
			<div className="flex w-full gap-8 [&>*]:w-full">
				<textarea
					ref={textareaRef}
					placeholder="Start typing something..."
					name={name}
					value={value}
					onChange={onChange}
					className={cn(
						'textarea textarea-bordered textarea-md',
						!!error && 'textarea-error'
					)}
				/>
				<div className="prose">
					<MarkdownRenderer markdown={value} />
				</div>
			</div>
			{error && (
				<div className="text-error">
					{typeof error === 'string' ?
						<p>{error}</p>
					:	error.map((err, i) => <p key={i}>{err}</p>)}
				</div>
			)}
		</div>
	);
}
