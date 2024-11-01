import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import validateRequest from '../_queries/validateRequest.query';
import LoginForm from './_login-form';

export const metadata: Metadata = {
	title: 'ObjectiveBias | Login',
};

export default async function Login() {
	const { session } = await validateRequest();

	if (session) {
		return redirect('/');
	}

	return (
		<div className="mx-auto grid min-h-screen max-w-xl place-items-center">
			<LoginForm />
		</div>
	);
}
