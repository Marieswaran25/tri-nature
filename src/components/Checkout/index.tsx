'use client';
import './checkout.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect, useState } from 'react';
import Shipping from '@assets/images/shipping.svg';
import Success from '@assets/images/successTick.svg';
import { Loader } from '@components/Loader';
import Typography from '@components/Typography';
import { useCart } from '@hooks/use-cart';
import { useCustomSelect } from '@hooks/use-custom-select';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'src/routes';

import { Billing } from './Billing';
import { OrderSummary } from './OrderSummary';

export const Checkout = () => {
    const { cartLoading, cart } = useCart();
    const [currentTarget, , , selectCurrentTarget] = useCustomSelect(0);
    const [success, setSuccess] = useState({
        shipping: false,
    });
    const router = useRouter();
    useEffect(() => {
        if (cart?.cartLineItems.length === 0) {
            router.push(ROUTES.HOME);
        }
    }, [cart?.cartLineItems, router]);
    return (
        <section className="checkout">
            {!cartLoading && cart ? (
                <div className="checkout-info">
                    <div className="checkout-form-wrapper">
                        <div className="icon-wrapper">
                            {success.shipping ? <Success /> : <Shipping />}
                            <Typography type="p1" weight="semibold" text="Shipping" as="strong" color={'black'} onClick={() => selectCurrentTarget(0)} />
                        </div>
                        <Billing
                            isActive={currentTarget === 0}
                            isSuccess={success.shipping}
                            handleSuccess={() => {
                                setSuccess(prev => ({ ...prev, shipping: true }));
                                selectCurrentTarget(1);
                            }}
                        />
                    </div>
                    <div className="order-summary-wrapper">
                        <OrderSummary />
                    </div>
                </div>
            ) : (
                <Loader style={{ border: `8px solid ${colors.LightCeruleanBlue}` }} outline="transparent" borderTopColor={colors.LightCeruleanBlue} />
            )}
        </section>
    );
};
