import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from '@udecode/plate';
import {
	useMarkToolbarButton,
	useMarkToolbarButtonState,
} from '@udecode/plate-common';
import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type EditorButtonProps = {
	nodeType:
		| typeof MARK_BOLD
		| typeof MARK_ITALIC
		| typeof MARK_UNDERLINE
		| typeof MARK_STRIKETHROUGH;
};

export default function EditorButton({ nodeType }: EditorButtonProps) {
	const state = useMarkToolbarButtonState({ nodeType });
	const { props } = useMarkToolbarButton(state);
	const { pressed, ...rest } = props;

	return (
		<button
			type="button"
			className={twMerge(
				!pressed && 'btn btn-square btn-neutral btn-sm',
				pressed && 'btn btn-square btn-primary btn-sm'
			)}
			{...rest}
		>
			{nodeType === MARK_BOLD && <Bold />}
			{nodeType === MARK_ITALIC && <Italic />}
			{nodeType === MARK_UNDERLINE && <Underline />}
			{nodeType === MARK_STRIKETHROUGH && <Strikethrough />}
		</button>
	);
}
