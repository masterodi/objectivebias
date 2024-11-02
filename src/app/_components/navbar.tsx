import Drawer from '@/components/drawer';
import { User } from 'lucia';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import logout from '../_actions/logout.action';
import getUser from '../_queries/getUser.query';

const SITE_NAME = 'ObjectiveBias';

export default async function Navbar() {
	const user = await getUser();
	return user ? <UserNavbar user={user} /> : <GuestNavbar />;
}

function GuestNavbar() {
	return (
		<nav className="navbar sticky top-4 z-10 m-4 w-auto rounded-md bg-base-300">
			<div className="navbar-start">
				<Link href="/" className="btn btn-link text-2xl font-bold">
					{SITE_NAME}
				</Link>
			</div>

			<div className="navbar-end gap-4">
				<Link href="/register" className="btn btn-ghost">
					Get Started <ArrowRight />
				</Link>
			</div>
		</nav>
	);
}

async function UserNavbar({ user }: { user: User }) {
	return (
		<nav className="navbar sticky top-4 z-10 mx-4 mt-4 w-auto rounded-md bg-base-300">
			<div className="navbar-start">
				<Link href="/" className="btn btn-link text-2xl font-bold">
					{SITE_NAME}
				</Link>
			</div>
			<div className="navbar-end gap-4">
				<span>{user.username}</span>
				<NavDrawer user={user} />
			</div>
		</nav>
	);
}

function NavDrawer({ user }: { user: User }) {
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
