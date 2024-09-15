import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Trinature',
        short_name: 'Trinature',
        description: 'Premier Organic Products Marketplace in Tamil Nadu',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f5f5',
        theme_color: '#3dad2b',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon',
            },
            {
                src: '/icon.png',
                sizes: '32x30',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}
