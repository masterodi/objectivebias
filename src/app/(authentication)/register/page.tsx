'use client';

import { register } from '@/app/actions/auth.actions';
import Input from '@/components/input';
import { useToast } from '@/components/toast';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function Register() {
	const [state, registerAction, isPending] = useFormState(register, null);
	const toast = useToast();

	useEffect(() => {
		if (state?.error) toast.error(state.error);
	}, [state]);

	return (
		<div className="grid min-h-screen place-items-center p-4">
			<form
				action={registerAction}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Create account</h1>
				<Input
					type="text"
					name="email"
					id="email"
					defaultValue={state?.payload.email ?? ''}
					label="Email"
					error={state?.validation?.data.email}
				/>
				<Input
					type="text"
					name="username"
					id="username"
					defaultValue={state?.payload.username ?? ''}
					label="Username"
					error={state?.validation?.data.username}
				/>
				<Input
					type="password"
					name="password"
					id="password"
					defaultValue={state?.payload.password ?? ''}
					label="Password"
					error={state?.validation?.data.password}
				/>
				<Input
					type="password"
					name="passwordConfirm"
					id="password-confirm"
					defaultValue={state?.payload.passwordConfirm ?? ''}
					label="Confirm Password"
					error={state?.validation?.data.passwordConfirm}
				/>
				<button
					type="submit"
					disabled={isPending}
					className="btn btn-primary"
				>
					{isPending ? 'Submitting...' : 'Register'}
				</button>
				<Link href="/login" className="btn btn-ghost">
					I already have an account
				</Link>
			</form>
		</div>
	);
}
