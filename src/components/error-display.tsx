type ErrorDisplayProps = {
	error?: string | string[];
};

export default function ErrorDisplay(props: ErrorDisplayProps) {
	if (!props.error) return null;

	return [...props.error].map((e) => <div className="text-error">{e}</div>);
}
