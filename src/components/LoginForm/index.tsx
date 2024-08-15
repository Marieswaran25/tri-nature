'use client';

import './loginForm.scss';
import colors from '@theme/colors.module.scss';

import React, { useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import CustomInput from '@components/CustomInput';
import Typography from '@components/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Login } from 'src/app/(auth)/login/action';
import { signUp } from 'src/app/(auth)/signup/action';
import { APP_NAME } from 'src/config';
import { loginSchema } from 'src/lib/schema';
import { ROUTES } from 'src/routes';
export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const onLogin = handleSubmit(data => {
        try {
            startTransition(async () => {
                const response: { error: string } | { success: boolean } = await Login(data);
                if ('error' in response) {
                    setError('root', { message: response.error });
                }
                if ('success' in response) {
                    reset();
                    router.push(ROUTES.HOME);
                }
            });
        } catch (error) {
        } finally {
            setError('root', { message: '' });
        }
    });
    return (
        <form id="login-form" onSubmit={onLogin}>
            <div className="header">
                <h3 className="typography h3 semibold">
                    Welcome back to
                    <span>{APP_NAME}</span>
                </h3>
                <Typography type="p2" text="Explore quality products from the best sellers" weight={'light'} as="p" />
            </div>
            <CustomInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                isRequired
                {...register('email')}
                error={errors?.email?.message}
                groupClass={errors?.email?.message ? 'error' : ''}
            />{' '}
            <CustomInput
                type="password"
                placeholder="Enter your password"
                label="Password"
                isRequired
                {...register('password')}
                error={errors?.password?.message}
                groupClass={errors?.password?.message ? 'error' : ''}
                hasEye
            />
            {errors?.root?.message && <Typography type="p2" weight="semibold" text={errors?.root?.message} color="red" />}
            <Button
                label={<Typography type="p2" weight="semibold" text={'Login'} color="white" />}
                buttonType="primary"
                backgroundColor={colors.SS5}
                id="sign-up-btn"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
            />
            <Link href={ROUTES.SIGNUP}>
                <Typography type="p3" weight="regular" text={`Do you haven't an account?`} color="gray" />
            </Link>
        </form>
    );
};
