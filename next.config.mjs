/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['t3.ftcdn.net', 'cdn.shopify.com/', 'cdn.sanity.io', 'pngimg.com', 'img.thecdn.in'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
