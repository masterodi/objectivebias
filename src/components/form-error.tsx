type FormErrorProps = {
	error?: string | string[];
};

export default function FormError(props: FormErrorProps) {
	if (!props.error) return null;

	return [...props.error].map((e) => <div className="text-error">{e}</div>);
}
