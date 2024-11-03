/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	serverExternalPackages: ['@node-rs/argon2'],
};

export default nextConfig;
