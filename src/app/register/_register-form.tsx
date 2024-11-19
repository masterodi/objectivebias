'use client';

import Button from '@/components/button';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import Link from 'next/link';
import { FormEventHandler, useTransition } from 'react';
import { register } from '../(users)/(actions)/register';

export default function RegisterForm() {
	const [isPending, startTransition] = useTransition();
	const toast = useToast();
	const { fields, setFields, errors, setErrors } = useFields({
		email: '',
		username: '',
		password: '',
		passwordConfirm: '',
	});

	const handleFieldChange = useChangeEventHandler(setFields);

	const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { error, validationError } = await register(fields);

			setErrors(validationError?.details);

			if (error) {
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
				name="email"
				id="email"
				label="Email"
				value={fields.email}
				onChange={handleFieldChange}
				error={errors?.email}
			/>
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
			<InputField
				type="password"
				name="passwordConfirm"
				id="password-confirm"
				label="Confirm Password"
				value={fields.passwordConfirm}
				onChange={handleFieldChange}
				error={errors?.passwordConfirm}
			/>
			<Button type="submit" variant="accent" loading={isPending}>
				Register
			</Button>
			<Link href="/login" className="btn btn-ghost">
				I already have an account
			</Link>
		</form>
	);
}
