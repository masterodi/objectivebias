import type { Metadata } from 'next';
import Footer from './_footer';
import Navbar from './_navbar';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
	title: 'ObjectiveBias',
	description:
		'A blog where opinions are given in a objective manner. Does not make much sense, does it? Well... just check it out',
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className="font-sans">
				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
