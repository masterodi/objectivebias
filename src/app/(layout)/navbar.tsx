import { Session } from '@/types';
import Link from 'next/link';
import logout from '../(authentication)/(actions)/logout.action';
import getSession from '../(authentication)/(queries)/getSession.query';
import AdminDrawer from './admin-drawer';

function GuestNavbar() {
	return (
		<nav className="navbar sticky top-0 z-10">
			<div className="navbar-start">
				<Link
					href="/"
					className="btn btn-link text-2xl font-bold uppercase"
				>
					brq
				</Link>
			</div>

			<div className="navbar-end gap-4">
				<Link href="/register" className="btn btn-ghost">
					Get Started
				</Link>
			</div>
		</nav>
	);
}

async function UserNavbar({ session }: { session: Session }) {
	return (
		<nav className="navbar w-full bg-base-300">
			<div className="navbar-start">
				<Link
					href="/"
					className="btn btn-link text-2xl font-bold uppercase"
				>
					brq
				</Link>
			</div>
			<div className="navbar-end gap-4">
				<span>{session.user.username}</span>
				<form action={logout}>
					<button type="submit" className="btn btn-ghost">
						Log Out
					</button>
				</form>

				{session.isModerator && <AdminDrawer />}
			</div>
		</nav>
	);
}

export default async function Navbar() {
	const session = await getSession();
	return !session ? <GuestNavbar /> : <UserNavbar session={session} />;
}
