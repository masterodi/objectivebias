export default function FormError({ error }: { error?: string }) {
	if (!error) return null;

	return <div className="text-error">{error}</div>;
}
