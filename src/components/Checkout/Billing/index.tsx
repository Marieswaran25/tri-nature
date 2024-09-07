'use client';
import './billing.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import CustomInput from '@components/CustomInput';
import CustomSelect from '@components/CustomSelect';
import Typography from '@components/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { Districts } from '@utils/districts';
import { Referrals } from '@utils/referrals';
import { billingSchema } from 'src/lib/schema';
import { usePathname } from 'next/navigation';
import { ROUTES } from 'src/routes';
export const Billing = ({ isActive, handleSuccess }: { isActive: boolean; isSuccess: boolean; handleSuccess: () => void }) => {
    const {
        register,
        formState: { errors, dirtyFields },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(billingSchema),
    });
    const [isDirty, setDirty] = useState(false);
    const pathname = usePathname();
    const handleFormChange = () => {
        setDirty(true);
    };

    const submit = handleSubmit(async data => {
        console.log(data);
        handleSuccess();
    });
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty && pathname !== `/${ROUTES.CHECKOUT}`) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, pathname]);

    return (
        <form className={`billing-form ${isActive ? 'active' : ''}`} id="billing-form" onSubmit={submit} onChange={handleFormChange}>
            <div className="group">
                <CustomInput
                    label={'First name'}
                    placeholder="Enter your firstname here"
                    {...register('firstName')}
                    error={errors?.firstName?.message}
                    isRequired
                    groupClass={errors?.firstName?.message ? 'error' : ''}
                />
                <CustomInput
                    label={'Last name'}
                    placeholder="Enter your lastname here"
                    {...register('lastName')}
                    error={errors?.lastName?.message}
                    isRequired
                    groupClass={errors?.lastName?.message ? 'error' : ''}
                />
            </div>
            <div className="group">
                <CustomInput
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    isRequired
                    {...register('email')}
                    error={errors?.email?.message}
                    groupClass={errors?.email?.message ? 'error' : ''}
                />
                <CustomInput
                    type="tel"
                    placeholder="Enter your mobile number"
                    label="Mobile Number"
                    {...register('mobile', { pattern: /^[0-9]{10}$/ })}
                    maxLength={10}
                    isRequired
                    inputMode="numeric"
                    error={errors?.mobile?.message}
                    groupClass={errors?.mobile?.message ? 'error' : ''}
                    info="Please enter valid registered mobile number, this will be used for communication"
                />
            </div>
            <div className="group">
                <CustomInput
                    type="text"
                    placeholder="House, apartment, floor etc."
                    label="Address Line 1"
                    isRequired
                    {...register('mainAddress')}
                    error={errors?.mainAddress?.message}
                    groupClass={errors?.mainAddress?.message ? 'error' : ''}
                />
                <CustomInput
                    type="text"
                    placeholder="Street, road etc."
                    label="Address Line 2"
                    isRequired
                    {...register('subAddress')}
                    error={errors?.subAddress?.message}
                    groupClass={errors?.subAddress?.message ? 'error' : ''}
                />
            </div>

            <div className="group">
                <CustomInput type="text" placeholder="Enter your city" label="City" isRequired {...register('city')} error={errors?.city?.message} groupClass={errors?.city?.message ? 'error' : ''} />

                <CustomSelect
                    placeholder={'Select District'}
                    register={register('district')}
                    options={Object.values(Districts).map(key => ({
                        label: key,
                        value: key,
                    }))}
                    id={'choose district'}
                    title="District"
                    isRequired
                    error={errors?.district?.message}
                    {...register('district')}
                    isValid={dirtyFields.district}
                />
            </div>
            <div className="group">
                <CustomInput
                    type="tel"
                    placeholder="Enter your pin code"
                    label="Pin Code"
                    {...register('postalCode')}
                    maxLength={6}
                    inputMode="numeric"
                    isRequired
                    error={errors?.postalCode?.message}
                    groupClass={errors?.postalCode?.message ? 'error' : ''}
                />
                <CustomSelect
                    placeholder={'Choose referral'}
                    register={register('referredBy')}
                    options={Object.values(Referrals).map(key => ({
                        label: key,
                        value: key,
                    }))}
                    id={'referral'}
                    title="How did you hear about us?"
                    error={errors?.referredBy?.message}
                    {...register('referredBy')}
                    isValid={dirtyFields.referredBy}
                />
            </div>
            <Button
                label={<Typography type="p2" text={'Continue'} weight="semibold" as="p" color="white" />}
                buttonType="primary"
                backgroundColor={colors.LightCeruleanBlue}
                id="continue-btn"
                type="submit"
                loadingColor="white"
                backgroundColorOnHover={colors.C9}
            />
        </form>
    );
};
