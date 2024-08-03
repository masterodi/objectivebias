type DashboardLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div>
			{children}
			<div className="drawer drawer-end">
				<input
					id="my-drawer-4"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-4"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
						<li>
							<a>Sidebar Item 1</a>
						</li>
						<li>
							<a>Sidebar Item 2</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
