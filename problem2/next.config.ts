import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// disable this demonstrates the use of Math.random() in a component, otherwise, it will automatically transformed in to useMemo
	reactCompiler: false,

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
