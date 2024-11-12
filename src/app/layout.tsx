import Container from '@/components/container';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { ReactNode } from 'react';
import Footer from './_components/footer';
import Navbar from './_components/navbar';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
	title: 'ObjectiveBias',
	description:
		'A place where opinions are given in a objective manner. Does not make much sense, does it? Well... just check it out',
};

type RootLayoutProps = {
	children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className="layout font-sans">
				<NuqsAdapter>
					<Providers>
						<Navbar />
						<Container className="p-4">{children}</Container>
						<Footer />
					</Providers>
				</NuqsAdapter>
			</body>
		</html>
	);
}
