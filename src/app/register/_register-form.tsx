'use client';

import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useTransition } from 'react';
import register from '../_actions/register.action';

export default function RegisterForm() {
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		email: '',
		username: '',
		password: '',
		passwordConfirm: '',
	});
	const toast = useToast();

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldsError(null);
		startTransition(async () => {
			const { validationError, error } = await register(fields);
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});
	};

	return (
		<form
			onSubmit={handleRegister}
			className="flex w-full flex-col gap-8 rounded-md bg-base-300 p-8 shadow-lg"
		>
			<h1 className="text-3xl font-bold">Create account</h1>
			<InputField
				type="text"
				name="email"
				id="email"
				label="Email"
				value={fields.email}
				onChange={handleFieldChange}
				error={fieldsError?.email}
			/>
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
			<InputField
				type="password"
				name="passwordConfirm"
				id="password-confirm"
				label="Confirm Password"
				value={fields.passwordConfirm}
				onChange={handleFieldChange}
				error={fieldsError?.passwordConfirm}
			/>
			<button
				type="submit"
				disabled={isPending}
				className="btn btn-primary"
			>
				{isPending ? 'Please wait...' : 'Register'}
			</button>
			<Link href="/login" className="btn btn-ghost">
				I already have an account
			</Link>
		</form>
	);
}
