import { redirect } from 'next/navigation';
import validateRequest from '../_queries/validateRequest.query';

type AdminLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const { session, user } = await validateRequest();

	if (!session) {
		return redirect('/login');
	}

	if (user.role !== 'moderator') {
		return redirect('/');
	}

	return children;
}
