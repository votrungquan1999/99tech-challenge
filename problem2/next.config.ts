import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,

	turbopack: {
		root: __dirname,
	},

	cacheComponents: true,

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/Switcheo/token-icons/**",
			},
		],
	},
};

export default nextConfig;
