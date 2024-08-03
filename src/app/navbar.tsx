import { getAuth } from '@/utils';
import Link from 'next/link';
import { logout } from './actions';

export default function Navbar() {
	const auth = getAuth();

	return (
		<nav className="navbar sticky top-0">
			<div className="navbar-start">
				<Link
					href="/"
					className="btn btn-link text-2xl font-bold uppercase"
				>
					brq
				</Link>
			</div>

			<div className="navbar-end gap-4">
				{!auth && (
					<Link href="/register" className="btn">
						Get Started
					</Link>
				)}
				{auth && (
					<>
						<span>{auth.username}</span>
						<form action={logout}>
							<button type="submit" className="btn">
								Log Out
							</button>
						</form>
						<div className="drawer-content">
							<label
								htmlFor="my-drawer-4"
								className="btn btn-ghost drawer-button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block h-5 w-5 stroke-current"
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
					</>
				)}
			</div>
		</nav>
	);
}
