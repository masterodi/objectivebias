import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	ELEMENT_PARAGRAPH,
	getNodeEntries,
	isBlock,
} from '@udecode/plate';
import {
	collapseSelection,
	focusEditor,
	toggleNodeType,
	useEditorRef,
	useEditorSelector,
} from '@udecode/plate-common';
import React from 'react';

export default function NodeTypeSelect() {
	const value: string = useEditorSelector((editor) => {
		let initialNodeType: string = ELEMENT_PARAGRAPH;
		let allNodesMatchInitialNodeType = false;
		const codeBlockEntries = getNodeEntries(editor, {
			match: (n) => isBlock(editor, n),
			mode: 'highest',
		});
		const nodes = Array.from(codeBlockEntries);

		if (nodes.length > 0) {
			initialNodeType = nodes[0][0].type as string;
			allNodesMatchInitialNodeType = nodes.every(([node]) => {
				const type: string =
					(node?.type as string) || ELEMENT_PARAGRAPH;

				return type === initialNodeType;
			});
		}

		return allNodesMatchInitialNodeType ? initialNodeType : (
				ELEMENT_PARAGRAPH
			);
	}, []);
	const editor = useEditorRef();

	const handleToggleNodeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		toggleNodeType(editor, { activeType: e.target.value });
		collapseSelection(editor);
		focusEditor(editor);
	};

	return (
		<select
			value={value}
			onChange={handleToggleNodeType}
			className="select select-sm"
		>
			<option value={ELEMENT_PARAGRAPH}>Paragraph</option>
			<option value={ELEMENT_H1}>Heading 1</option>
			<option value={ELEMENT_H2}>Heading 2</option>
			<option value={ELEMENT_H3}>Heading 3</option>
			<option value={ELEMENT_H4}>Heading 4</option>
			<option value={ELEMENT_H5}>Heading 5</option>
			<option value={ELEMENT_H6}>Heading 6</option>
		</select>
	);
}
