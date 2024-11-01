'use client';

import Drawer from '@/components/drawer';
import { User } from 'lucia';
import Link from 'next/link';
import logout from './_actions/logout.action';

type DrawerProps = {
	user: User;
};

export default function NavDrawer({ user }: DrawerProps) {
	return (
		<Drawer id="nav-drawer">
			<div className="flex flex-col gap-2 p-4">
				{user.role === 'moderator' && (
					<div className="grid gap-4">
						<Link
							href="/admin/dashboard?view=posts"
							className="btn btn-ghost"
						>
							View Posts
						</Link>
						<Link
							href="/admin/dashboard?view=tags"
							className="btn btn-ghost"
						>
							View Tags
						</Link>
						<Link
							href="/admin/posts/create"
							className="btn btn-ghost"
						>
							Create a new post
						</Link>
					</div>
				)}
				<form action={logout} className="mt-auto">
					<button type="submit" className="btn btn-warning w-full">
						Log Out
					</button>
				</form>
			</div>
		</Drawer>
	);
}
