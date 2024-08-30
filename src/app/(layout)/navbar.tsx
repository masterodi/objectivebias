import { Session } from '@/types';
import Link from 'next/link';
import { logout } from '../actions/auth.actions';
import { getSession } from '../queries/auth.queries';

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
		<div className="drawer drawer-end">
			<input
				id="dashboard-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<nav className="navbar w-full bg-base-300">
					<div className="navbar-start">
						<Link
							href="/"
							className="btn btn-link text-2xl font-bold uppercase"
						>
							brq
						</Link>
					</div>
					<div className="navbar-end">
						<span>{session.username}</span>
						<form action={logout}>
							<button type="submit" className="btn btn-ghost">
								Log Out
							</button>
						</form>
						<div>
							<label
								htmlFor="dashboard-drawer"
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
					</div>
				</nav>
			</div>

			<div className="drawer-side z-20">
				<label
					htmlFor="dashboard-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu min-h-full w-80 bg-base-200 p-4">
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

export default async function Navbar() {
	const session = await getSession();
	return !session ? <GuestNavbar /> : <UserNavbar session={session} />;
}
