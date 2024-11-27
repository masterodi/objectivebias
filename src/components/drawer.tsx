import { Menu } from 'lucide-react';
import { ChangeEvent, ReactNode } from 'react';

type DrawerProps = {
	children: ReactNode;
	toggler?: ReactNode;
	isOpen?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	id: string;
};

export default function Drawer({
	children,
	toggler,
	isOpen,
	onChange,
	id,
}: DrawerProps) {
	return (
		<div className="drawer drawer-end w-auto">
			<input
				id={id}
				type="checkbox"
				checked={isOpen}
				onChange={onChange}
				className="drawer-toggle"
			/>
			<div className="drawer-content">
				{toggler ?? (
					<label
						htmlFor={id}
						aria-label="open sidebar"
						className="btn btn-square btn-ghost"
					>
						<Menu />
					</label>
				)}
			</div>

			<div className="drawer-side z-20">
				<label
					htmlFor={id}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="flex min-h-full w-3/4 max-w-md bg-base-300 [&>*]:flex-1">
					{children}
				</div>
			</div>
		</div>
	);
}
