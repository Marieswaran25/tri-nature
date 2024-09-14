import { PrismaAdapter } from '@auth/prisma-adapter';
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
});
