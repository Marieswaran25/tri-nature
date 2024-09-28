'use client';
import './billing.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import CustomInput from '@components/CustomInput';
import CustomSelect from '@components/CustomSelect';
import Typography from '@components/Typography';
import { LocalStorage } from '@Customtypes/localStorage';
import { yupResolver } from '@hookform/resolvers/yup';
import { Address } from '@prisma/client';
import { Districts } from '@utils/districts';
import { Referrals } from '@utils/referrals';
import { billingSchema } from 'src/lib/schema';
export const Billing = ({ isActive, handleSuccess }: { isActive: boolean; isSuccess: boolean; handleSuccess: (data: Partial<Address>) => void }) => {
    const {
        register,
        formState: { errors, dirtyFields },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(billingSchema),
    });

    useEffect(() => {
        const localBilling = localStorage.getItem(LocalStorage.Billing);
        if (localBilling) {
            reset(JSON.parse(localBilling));
            handleSuccess(JSON.parse(localBilling));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = handleSubmit(async data => {
        localStorage.setItem(LocalStorage.Billing, JSON.stringify(data));
        handleSuccess(data);
    });

    return (
        <form className={`billing-form ${isActive ? 'active' : ''}`} id="billing-form" onSubmit={submit}>
            <Typography type="p2" weight="light" text="Enter your shipping details to securely process your order." as="h3" color="gray" />

            <div className="group">
                <CustomInput
                    type="text"
                    placeholder="House, apartment, floor etc."
                    label="Address Line 1"
                    isRequired
                    {...register('addressLine1')}
                    error={errors?.addressLine1?.message}
                    groupClass={errors?.addressLine1?.message ? 'error' : ''}
                />
                <CustomInput
                    type="text"
                    placeholder="Street, road etc."
                    label="Address Line 2"
                    isRequired
                    {...register('addressLine2')}
                    error={errors?.addressLine2?.message}
                    groupClass={errors?.addressLine2?.message ? 'error' : ''}
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
                    {...register('pinCode')}
                    maxLength={6}
                    inputMode="numeric"
                    isRequired
                    error={errors?.pinCode?.message}
                    groupClass={errors?.pinCode?.message ? 'error' : ''}
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
            <div className="group">
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
