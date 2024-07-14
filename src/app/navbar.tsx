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
					</>
				)}
			</div>
		</nav>
	);
}
