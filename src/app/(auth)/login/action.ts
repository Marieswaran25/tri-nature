'use server';

import { comparePassword, encryptPassword } from '@function/passwordHashing';
import { cookies } from 'next/headers';
import { lucia } from 'src/lib/auth';
import { prismaInstance } from 'src/lib/prisma';

export async function Login(credentials: { email: string; password: string }): Promise<{ error: string } | { success: boolean }> {
    try {
        const { email, password } = credentials;

        const isEmailAlreadyExist = await prismaInstance.user.findFirst({
            where: {
                email,
            },
        });
        if (isEmailAlreadyExist && isEmailAlreadyExist.password) {
            const isMatch = await comparePassword(password, isEmailAlreadyExist.password);
            if (!isMatch) {
                return { error: 'Invalid credentials' };
            }
            const session = await lucia.createSession(isEmailAlreadyExist.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return {
                success: true,
            };
        } else {
            return { error: 'Email not exist' };
        }
    } catch (error) {
        return { error: 'Something went wrong, Please try again..' };
    }
}
