'use client';

import Markdown from 'react-markdown';

type MarkdownRenderProps = {
	markdown?: string;
};

export default function MarkdownRender({ markdown }: MarkdownRenderProps) {
	return <Markdown>{markdown}</Markdown>;
}
