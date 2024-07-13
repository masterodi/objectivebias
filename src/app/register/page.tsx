import Link from 'next/link';
import { register } from '../actions';

export default function Register() {
	return (
		<div className="grid min-h-screen place-items-center font-sans">
			<form
				action={register}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Create account</h1>
				<div className="grid w-full">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						className="input w-full"
					/>
				</div>
				<div className="grid w-full">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						className="input w-full"
					/>
				</div>
				<div className="grid">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						className="input w-full"
					/>
				</div>
				<div className="grid">
					<label htmlFor="password-confirm">Confirm Password</label>
					<input
						type="password"
						name="password-confirm"
						id="password-confirm"
						className="input w-full"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
				<Link href="/login" className="btn btn-ghost">
					I already have an account
				</Link>
			</form>
		</div>
	);
}
