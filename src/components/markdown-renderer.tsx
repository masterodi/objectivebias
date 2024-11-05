import Markdown from 'react-markdown';

type MarkdownRenderProps = {
	markdown?: string;
};

export default function MarkdownRenderer({ markdown }: MarkdownRenderProps) {
	return <Markdown>{markdown}</Markdown>;
}
