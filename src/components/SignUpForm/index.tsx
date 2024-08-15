'use client';

import './signupForm.scss';
import colors from '@theme/colors.module.scss';

import React, { useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import CustomInput from '@components/CustomInput';
import Typography from '@components/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from 'src/app/(auth)/signup/action';
import { APP_NAME } from 'src/config';
import { signUpSchema } from 'src/lib/schema';
import { ROUTES } from 'src/routes';
export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const onSignUp = handleSubmit(data => {
        try {
            startTransition(async () => {
                const response: { error: string } | { success: boolean } = await signUp(data);
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
        <form id="sign-up-form" onSubmit={onSignUp}>
            <div className="header">
                <h3 className="typography h3 semibold">
                    Sign Up to
                    <span>{APP_NAME}</span>
                </h3>
                <Typography type="p2" text="A place where you can buy organic products" weight={'light'} as="p" />
            </div>
            <CustomInput
                label={'Username'}
                placeholder="Enter your username"
                {...register('username')}
                error={errors?.username?.message}
                isRequired
                groupClass={errors?.username?.message ? 'error' : ''}
            />
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
                label={<Typography type="p2" weight="semibold" text={'Create account'} color="white" />}
                buttonType="primary"
                backgroundColor={colors.SS5}
                id="sign-up-btn"
                type="submit"
                isLoading={isPending}
                disabled={isPending}
            />
            <Link href={ROUTES.LOGIN}>
                <Typography type="p3" weight="regular" text={'Already have an account?'} color="gray" />
            </Link>
        </form>
    );
};
