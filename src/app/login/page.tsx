import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import validateRequest from '../_queries/validateRequest.query';
import LoginForm from './login-form';

export const metadata: Metadata = {
	title: 'ObjectiveBias | Login',
};

export default async function Login() {
	const { session } = await validateRequest();

	if (session) {
		return redirect('/');
	}

	return <LoginForm />;
}
