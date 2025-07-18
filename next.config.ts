import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'garden-courses.vercel.app',
            },
        ]
    }
};

export default nextConfig;
