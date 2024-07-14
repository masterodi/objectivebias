'use client';

import FormError from '@/components/form-error';
import FormInput from '@/components/form-input';
import Link from 'next/link';
import { useActionState } from 'react';
import { register } from '../actions';

export default function Register() {
	const [state, registerAction, isPending] = useActionState(register, {});

	return (
		<div className="grid min-h-screen place-items-center font-sans">
			<form
				action={registerAction}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Create account</h1>
				<FormInput
					type="text"
					name="email"
					id="email"
					defaultValue={state.payload?.email as string}
					label="Email"
					error={state.validationErrors?.['email']?.[0]}
				/>
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
				<FormInput
					type="text"
					name="passwordConfirm"
					id="password-confirm"
					defaultValue={state.payload?.passwordConfirm as string}
					label="Confirm Password"
					error={state.validationErrors?.['passwordConfirm']?.[0]}
				/>
				<FormError error={state.error} />
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
