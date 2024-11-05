'use client';

import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useTransition } from 'react';
import login from '../_actions/login.action';

export default function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		username: '',
		password: '',
	});
	const toast = useToast();

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldsError(null);
		startTransition(async () => {
			const { validationError, error } = await login(fields);
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});
	};

	return (
		<form
			onSubmit={handleLogin}
			className="flex w-full flex-col gap-8 rounded-md bg-base-300 p-8 shadow-lg"
		>
			<h1 className="text-3xl font-bold">Enter account</h1>
			<InputField
				type="text"
				name="username"
				id="username"
				label="Username"
				value={fields.username}
				onChange={handleFieldChange}
				error={fieldsError?.username}
			/>
			<InputField
				type="password"
				name="password"
				id="password"
				label="Password"
				value={fields.password}
				onChange={handleFieldChange}
				error={fieldsError?.password}
			/>
			<button
				type="submit"
				disabled={isPending}
				className="btn btn-primary"
			>
				{isPending ? 'Please wait...' : 'Log In'}
			</button>
			<Link href="/register" className="btn btn-neutral">
				I want to create an account
			</Link>
		</form>
	);
}
