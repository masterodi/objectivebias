'use client';

import Input from '@/components/input';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import Link from 'next/link';
import { ChangeEvent, useTransition } from 'react';
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

	const handleRegister = async () =>
		startTransition(async () => {
			setFieldsError(null);

			const { validationError, error } = await register(fields);
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			}
		});

	return (
		<div className="grid min-h-screen place-items-center p-4">
			<form
				action={handleRegister}
				className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg"
			>
				<h1 className="text-3xl font-bold">Create account</h1>
				<Input
					type="text"
					name="email"
					id="email"
					label="Email"
					value={fields.email}
					onChange={handleFieldChange}
					error={fieldsError?.email}
				/>
				<Input
					type="text"
					name="username"
					id="username"
					label="Username"
					value={fields.username}
					onChange={handleFieldChange}
					error={fieldsError?.username}
				/>
				<Input
					type="password"
					name="password"
					id="password"
					label="Password"
					value={fields.password}
					onChange={handleFieldChange}
					error={fieldsError?.password}
				/>
				<Input
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
		</div>
	);
}
