'use client';

import register from '@/app/actions/register';
import FormInput from '@/components/form-input';
import { useToast } from '@/components/toast';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function Register() {
	const [state, registerAction, isPending] = useFormState(register, {});
	const toast = useToast();

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state]);

	return (
		<div className="grid min-h-screen place-items-center p-4">
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
					error={state.validationErrors?.data.email?.[0]}
				/>
				<FormInput
					type="text"
					name="username"
					id="username"
					defaultValue={state.payload?.username as string}
					label="Username"
					error={state.validationErrors?.data.username?.[0]}
				/>
				<FormInput
					type="password"
					name="password"
					id="password"
					defaultValue={state.payload?.password as string}
					label="Password"
					error={state.validationErrors?.data.password?.[0]}
				/>
				<FormInput
					type="password"
					name="passwordConfirm"
					id="password-confirm"
					defaultValue={state.payload?.passwordConfirm as string}
					label="Confirm Password"
					error={state.validationErrors?.data.passwordConfirm?.[0]}
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
