import { cn } from '@/utils';
import { ChangeEvent, ClipboardEventHandler } from 'react';
import MarkdownRenderer from './markdown-renderer';

type MarkdownWriteProps = {
	name?: string;
	id?: string;
	className?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onPaste?: ClipboardEventHandler<HTMLTextAreaElement>;
	error?: string | string[];
};

type MarkdownPreviewProps = {
	value?: string;
};

type MarkdownEditorProps = {
	name?: string;
	id?: string;
	className?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onPaste?: ClipboardEventHandler<HTMLTextAreaElement>;
	error?: string | string[];
};

export default function MarkdownEditor({
	name,
	id,
	className,
	value,
	onChange,
	onPaste,
	error,
}: MarkdownEditorProps) {
	return (
		<div id={id} className="grid gap-1">
			<div role="tablist" className="tabs-boxed tabs bg-transparent">
				<input
					type="radio"
					defaultChecked={true}
					name="markdown-views"
					role="tab"
					className="tab !rounded-lg"
					aria-label="Write"
				/>
				<div role="tabpanel" className="tab-content mt-2">
					<MarkdownWrite
						name={name}
						value={value}
						onChange={onChange}
						onPaste={onPaste}
						error={error}
						className={className}
					/>
				</div>

				<input
					type="radio"
					name="markdown-views"
					role="tab"
					className="tab !rounded-lg"
					aria-label="Preview"
				/>
				<div role="tabpanel" className="tab-content mt-2">
					<MarkdownPreview value={value} />
				</div>
			</div>
		</div>
	);
}

const MarkdownWrite = ({
	name,
	className,
	value,
	onChange,
	onPaste,
	error,
}: MarkdownWriteProps) => {
	return (
		<div>
			<textarea
				placeholder="Start typing something..."
				name={name}
				value={value}
				onChange={onChange}
				onPaste={onPaste}
				className={cn(
					'textarea textarea-bordered textarea-md h-[1240px] min-h-[250px] w-full',
					!!error && 'textarea-error',
					className
				)}
			/>
			{error && (
				<div className="text-error">
					{typeof error === 'string' ?
						<p>{error}</p>
					:	error.map((err, i) => <p key={i}>{err}</p>)}
				</div>
			)}
		</div>
	);
};

const MarkdownPreview = ({ value }: MarkdownPreviewProps) => {
	return (
		<div className="textarea prose textarea-bordered min-h-[250px] w-full max-w-full">
			<MarkdownRenderer markdown={value} />
		</div>
	);
};
