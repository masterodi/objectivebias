import { User } from 'lucia';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import getUser from './(users)/(queries)/getUser';
import NavDrawer from './nav-drawer';

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
				<Link href="/register" className="group btn btn-ghost">
					Get Started{' '}
					<ArrowRight className="transition-all duration-200 ease-in-out group-hover:translate-x-[2px]" />
				</Link>
			</div>
		</nav>
	);
}

function UserNavbar({ user }: { user: User }) {
	return (
		<nav className="navbar sticky top-4 z-10 mx-4 mt-4 w-auto rounded-md bg-base-300">
			<div className="navbar-start">
				<Link href="/" className="btn btn-link text-2xl font-bold">
					{SITE_NAME}
				</Link>
			</div>
			<div className="navbar-end gap-4">
				<span className="hidden md:inline-block">{user.username}</span>
				<NavDrawer user={user} />
			</div>
		</nav>
	);
}
