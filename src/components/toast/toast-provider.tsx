import React, { createContext, useContext, useReducer, useRef } from 'react';
import { DISMISS_TOAST, PUSH_TOAST, reducer } from './toast-reducer';
import Toaster from './toaster';
import { ToastType } from './types';

const useToastId = () => {
	const countRef = useRef(0);

	const generateId = () => {
		countRef.current += 1;
		return countRef.current.toString();
	};

	return generateId;
};

type ToastContextProps = {
	push: (message: string, type?: ToastType) => void;
	dismiss: (id?: string) => void;
	success: (message: string) => void;
	warning: (message: string) => void;
	error: (message: string) => void;
	info: (message: string) => void;
};

const ToastContext = createContext<ToastContextProps | null>(null);

export const useToast = () => {
	const ctx = useContext(ToastContext);

	if (!ctx) {
		throw Error('useToast must be used inside child of ToastProvider');
	}

	return ctx;
};

type ToastProviderProps = { children: React.ReactNode };

export default function ToastProvider(props: ToastProviderProps) {
	const generateId = useToastId();
	const [state, dispatch] = useReducer(reducer, []);

	const dismiss = (id?: string) => {
		dispatch({ type: DISMISS_TOAST, payload: id ? { id } : undefined });
	};

	const push = (message: string, type?: ToastType) => {
		const id = generateId();
		dispatch({
			type: PUSH_TOAST,
			payload: { id, message, type },
		});
		setTimeout(() => {
			dismiss(id);
		}, 4000);
	};

	const success = (message: string) => push(message, 'success');
	const warning = (message: string) => push(message, 'warning');
	const error = (message: string) => push(message, 'error');
	const info = (message: string) => push(message, 'info');

	return (
		<ToastContext.Provider
			value={{ push, dismiss, success, warning, error, info }}
		>
			{props.children}
			<Toaster toasts={state} />
		</ToastContext.Provider>
	);
}
