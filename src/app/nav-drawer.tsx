'use client';

import Drawer from '@/components/drawer';
import { User } from 'lucia';
import Link from 'next/link';
import { FormEventHandler, useState } from 'react';
import logout from './(users)/(actions)/logout';

type NavDrawerProps = {
	user: User;
};

export default function NavDrawer({ user }: NavDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogOut: FormEventHandler = async (e) => {
		e.preventDefault();
		await logout();
	};

	return (
		<Drawer id="nav-drawer" isOpen={isOpen} onChange={handleToggle}>
			<div className="flex flex-col gap-2 p-4">
				{user.role === 'moderator' && (
					<div className="grid gap-4">
						<Link
							href="/admin/dashboard?view=posts"
							onClick={handleToggle}
							className="btn btn-ghost"
						>
							View Posts
						</Link>
						<Link
							href="/admin/posts/create"
							onClick={handleToggle}
							className="btn btn-ghost"
						>
							Create a new post
						</Link>
						<Link
							href="/admin/dashboard?view=tags"
							onClick={handleToggle}
							className="btn btn-ghost"
						>
							View Tags
						</Link>
					</div>
				)}
				<form onSubmit={handleLogOut} className="mt-auto">
					<button type="submit" className="btn btn-warning w-full">
						Log Out
					</button>
				</form>
			</div>
		</Drawer>
	);
}
