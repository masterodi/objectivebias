'use client';

import FormError from '@/components/form-error';
import FormInput from '@/components/form-input';
import { useActionState } from 'react';
import { login } from '../actions';

export default function Register() {
	const [state, loginAction, isPending] = useActionState(login, {});

	return (
		<div className="grid min-h-screen place-items-center p-4">
			<form
				action={loginAction}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Enter account</h1>
				<FormInput
					type="text"
					name="username"
					id="username"
					defaultValue={state.payload?.username as string}
					label="Username"
					error={state.validationErrors?.['username']?.[0]}
				/>
				<FormInput
					type="password"
					name="password"
					id="password"
					defaultValue={state.payload?.password as string}
					label="Password"
					error={state.validationErrors?.['password']?.[0]}
				/>
				<FormError error={state.error} />
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
