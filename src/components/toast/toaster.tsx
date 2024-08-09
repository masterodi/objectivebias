import { Toast, ToastType } from './types';

export default function Toaster({ toasts }: { toasts: Toast[] }) {
	const getClasses = (type?: ToastType) => {
		if (type === 'success') return 'alert alert-success';
		if (type === 'warning') return 'alert alert-warning';
		if (type === 'error') return 'alert alert-error';
		if (type === 'info') return 'alert alert-info';
		return 'alert';
	};

	return (
		<div className="toast toast-end">
			{toasts.map((t) => (
				<div key={t.id} className={getClasses(t.type)}>
					<span>{t.message}</span>
				</div>
			))}
		</div>
	);
}
