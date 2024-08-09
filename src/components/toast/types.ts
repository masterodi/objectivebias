export type ToastType = 'success' | 'warning' | 'error' | 'info';

export type Toast = {
	id: string;
	message: string;
	type?: ToastType;
};
