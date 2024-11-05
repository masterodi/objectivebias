import { cn } from '@/utils';
import { FormEvent, ReactNode } from 'react';

type DialogProps = {
	children: ReactNode;
	open?: boolean;
	id: string;
	onClose?: (e: FormEvent<HTMLFormElement>) => void;
};

const Dialog = ({ children, open, id, onClose }: DialogProps) => {
	const _handleClose = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onClose?.(e);
	};

	return (
		<dialog
			id={id}
			open={open}
			className={cn('modal', open && 'modal-open')}
		>
			<div className="modal-box bg-base-300">{children}</div>
			<form
				method="dialog"
				onSubmit={_handleClose}
				className="modal-backdrop"
			>
				<button>close</button>
			</form>
		</dialog>
	);
};

export default Dialog;
