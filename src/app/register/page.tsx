import Center from '@/components/center';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import validateRequest from '../(users)/(queries)/validateRequest';
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
		<Center>
			<RegisterForm />
		</Center>
	);
}
