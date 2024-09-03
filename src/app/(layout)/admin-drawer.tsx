'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function AdminDrawer() {
	useEffect(() => {
		const checkboxEl =
			document.querySelector<HTMLInputElement>('#admin-drawer')!;
		const links = document.querySelectorAll<HTMLAnchorElement>(
			'#admin-drawer-list a'
		);

		const toggleCheckbox = () => {
			checkboxEl.checked = !checkboxEl.checked;
		};

		links.forEach((el) => {
			el.addEventListener('click', toggleCheckbox);
		});

		return () => {
			links.forEach((el) => {
				el.removeEventListener('click', toggleCheckbox);
			});
		};
	}, []);

	return (
		<div className="drawer drawer-end w-auto">
			<input
				id="admin-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content">
				<label
					htmlFor="admin-drawer"
					aria-label="open sidebar"
					className="btn btn-square btn-ghost"
				>
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
				</label>
			</div>

			<div className="drawer-side z-20">
				<label
					htmlFor="admin-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul
					id="admin-drawer-list"
					className="menu min-h-full w-80 bg-base-200 p-4"
				>
					<li>
						<Link href="/dashboard">Admin Dashboard</Link>
					</li>
					<li>
						<Link href="/dashboard/posts/create">
							Create a new post
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
