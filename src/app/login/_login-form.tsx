'use client';

import Button from '@/components/button';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import Link from 'next/link';
import { FormEventHandler, useTransition } from 'react';
import login from '../(users)/(actions)/login';

export default function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();
	const { fields, setFields, errors, setErrors } = useFields({
		username: '',
		password: '',
	});

	const handleFieldChange = useChangeEventHandler(setFields);

	const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { validationError, error } = await login(fields);

			setErrors(validationError?.details);

			if (error) {
				toast.error(error);
			}
		});
	};

	return (
		<form
			onSubmit={handleLogin}
			className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-md bg-base-200 p-8 shadow-sm"
		>
			<h1 className="text-3xl font-bold">Enter account</h1>
			<InputField
				name="username"
				id="username"
				label="Username"
				value={fields.username}
				onChange={handleFieldChange}
				error={errors?.username}
			/>
			<InputField
				type="password"
				name="password"
				id="password"
				label="Password"
				value={fields.password}
				onChange={handleFieldChange}
				error={errors?.password}
			/>
			<Button type="submit" variant="primary" loading={isPending}>
				Log In
			</Button>
			<Link href="/register" className="btn btn-ghost">
				I want to create an account
			</Link>
		</form>
	);
}
