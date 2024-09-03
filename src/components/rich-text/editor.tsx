import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from '@udecode/plate';
import { Plate, PlateContent, PlateProps } from '@udecode/plate-common';
import { twMerge } from 'tailwind-merge';
import ErrorDisplay from '../error-display';
import EditorButton from './components/editor-button';
import NodeTypeSelect from './components/node-type-select';
import plugins from './plugins';

type EditorProps = {
	label?: string;
	initialValue?: PlateProps['initialValue'];
	onChange?: PlateProps['onChange'];
	readOnly?: PlateProps['readOnly'];
	error?: string | string[];
};

export default function Editor({
	label,
	initialValue,
	onChange,
	readOnly,
	error,
}: EditorProps) {
	return (
		<Plate
			plugins={plugins}
			initialValue={initialValue}
			onChange={onChange}
			readOnly={readOnly}
		>
			<div>
				{label && <label className="mb-1">{label}</label>}
				{!readOnly && (
					<div className="mt-2 flex gap-1">
						<NodeTypeSelect />
						<EditorButton nodeType={MARK_BOLD} />
						<EditorButton nodeType={MARK_ITALIC} />
						<EditorButton nodeType={MARK_UNDERLINE} />
						<EditorButton nodeType={MARK_STRIKETHROUGH} />
					</div>
				)}
				<PlateContent
					placeholder="Type..."
					className={twMerge(
						!readOnly &&
							`textarea prose textarea-bordered ${error && 'textarea-error'} mt-2`
					)}
				/>
				<ErrorDisplay error={error} />
			</div>
		</Plate>
	);
}
