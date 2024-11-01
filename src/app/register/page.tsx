import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import validateRequest from '../_queries/validateRequest.query';
import RegisterForm from './_register-form';

export const metadata: Metadata = {
	title: 'ObjectiveBias | Register',
};

export default async function Register() {
	const { session } = await validateRequest();

	if (session) {
		return redirect('/');
	}

	return (
		<div className="mx-auto grid min-h-screen max-w-xl place-items-center">
			<RegisterForm />
		</div>
	);
}
