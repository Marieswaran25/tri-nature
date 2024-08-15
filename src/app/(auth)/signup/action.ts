'use server';

import { encryptPassword } from '@function/passwordHashing';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from 'src/lib/auth';
import { prismaInstance } from 'src/lib/prisma';

export async function signUp(credentials: { email: string; username: string; password: string }): Promise<{ error: string } | { success: boolean }> {
    try {
        const { email, password, username } = credentials;

        const isEmailAlreadyExist = await prismaInstance.user.findFirst({
            where: {
                email,
            },
        });
        console.log(isEmailAlreadyExist);
        if (!isEmailAlreadyExist) {
            const hash = await encryptPassword(password);
            const user = await prismaInstance.user.create({
                data: {
                    email,
                    username,
                    password: hash,
                    avatarUrl: '',
                    googleId: '',
                },
            });
            const session = await lucia.createSession(user.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return {
                success: true,
            };
        } else {
            return { error: 'Email already exist' };
        }
    } catch (error) {
        return { error: 'Something went wrong, Please try again..' };
    }
}
