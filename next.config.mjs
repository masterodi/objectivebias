/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	serverExternalPackages: ['clsx', '@node-rs/argon2'],
};

export default nextConfig;
