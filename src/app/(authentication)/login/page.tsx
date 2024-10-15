'use client';

import Input from '@/components/input';
import { useToast } from '@/components/toast';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import login from '../(actions)/login.action';

export default function Login() {
	const [state, loginAction, isPending] = useFormState(login, null);
	const toast = useToast();

	useEffect(() => {
		if (state?.error) toast.error(state.error);
	}, [state]);

	return (
		<div className="grid min-h-screen place-items-center p-4">
			<form
				action={loginAction}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Enter account</h1>
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
				<button
					type="submit"
					disabled={isPending}
					className="btn btn-primary"
				>
					{isPending ? 'Submitting...' : 'Log In'}
				</button>
			</form>
		</div>
	);
}
