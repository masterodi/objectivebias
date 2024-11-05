import { ReactNode } from 'react';

type DrawerProps = {
	children: ReactNode;
	toggler?: ReactNode;
	id: string;
};

export default function Drawer({ children, toggler, id }: DrawerProps) {
	return (
		<div className="drawer drawer-end w-auto">
			<input id={id} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<label htmlFor={id} aria-label="open sidebar">
					{toggler ?? (
						<span className="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-6 w-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</span>
					)}
				</label>
			</div>

			<div className="drawer-side z-20">
				<label
					htmlFor={id}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="flex min-h-full w-60 bg-base-300 md:w-80 [&>*]:flex-1">
					{children}
				</div>
			</div>
		</div>
	);
}
