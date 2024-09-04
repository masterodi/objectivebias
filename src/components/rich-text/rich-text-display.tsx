'use client';

import { Plate, PlateContent, Value } from '@udecode/plate-common';
import plugins from './plugins';

export default function RichTextDisplay({
	richText,
}: {
	richText: Value | string;
}) {
	return (
		<Plate
			plugins={plugins}
			initialValue={
				typeof richText === 'string' ? JSON.parse(richText) : richText
			}
			readOnly
		>
			<PlateContent className="overflow-hidden text-ellipsis whitespace-nowrap break-words" />
		</Plate>
	);
}
