import Center from '@/components/center';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import validateRequest from '../(users)/(queries)/validateRequest';
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
		<Center>
			<LoginForm />
		</Center>
	);
}
