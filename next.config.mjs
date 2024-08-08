/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'rcw108.com',
				port: '',
				pathname: '/work/woo/wp-content/uploads/**'
			}
		]
	}
}

export default nextConfig
