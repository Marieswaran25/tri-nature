import './globals.scss';

import { NavBar } from '@components/Navbar';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
    fallback: ['sans-serif'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
