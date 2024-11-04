import { EllipsisVertical } from 'lucide-react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type DropdownProps = {
	toggler?: ReactNode;
	align?: 'end';
	children: ReactNode;
};

export default function Dropdown({ toggler, align, children }: DropdownProps) {
	return (
		<div className={twMerge('dropdown', align === 'end' && 'dropdown-end')}>
			{toggler ?? (
				<div
					tabIndex={0}
					role="button"
					className="btn btn-square btn-ghost btn-sm m-1"
				>
					<EllipsisVertical />
				</div>
			)}
			{children}
		</div>
	);
}
