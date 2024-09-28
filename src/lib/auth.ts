import { PrismaAdapter } from '@auth/prisma-adapter';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { prismaInstance } from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prismaInstance),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn(params) {
            cookies().set('userId', params.user.id || '', { path: '/', sameSite: 'strict', secure: true, httpOnly: true });
            return true;
        },
    },
});
