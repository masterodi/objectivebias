'use client';

import login from '@/app/actions/login';
import FormInput from '@/components/form-input';
import { useToast } from '@/components/toast';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function Login() {
	const [state, loginAction, isPending] = useFormState(login, {});
	const toast = useToast();

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state]);

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
