'use client';
import './checkout.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect } from 'react';
import { Loader } from '@components/Loader';
import { useCart } from '@hooks/use-cart';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'src/routes';

export const Checkout = () => {
    const { cartLoading, cart } = useCart();
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
                    <div className="checkout-form-wrapper"></div>
                    <div className="order-summary-wrapper"></div>
                </div>
            ) : (
                <Loader style={{ border: `7px solid ${colors.LightCeruleanBlue}` }} outline="transparent" borderTopColor={colors.LightCeruleanBlue} />
            )}
        </section>
    );
};
