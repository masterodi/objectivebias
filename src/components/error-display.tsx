type ErrorDisplayProps = {
	error?: string | string[];
};

export default function ErrorDisplay(props: ErrorDisplayProps) {
	if (!props.error) return null;

	return [...props.error].map((e, i) => (
		<div key={i} className="text-error">
			{e}
		</div>
	));
}
