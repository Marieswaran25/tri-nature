'use client';
import './checkout.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect, useState } from 'react';
import PaymentCard from '@assets/images/payment/card.svg';
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
import { PaymentMode } from './PaymentMode';

export const Checkout = () => {
    const { cartLoading, cart } = useCart();
    const [currentTarget, , , selectCurrentTarget] = useCustomSelect(0);
    const [success, setSuccess] = useState({
        shipping: false,
        PaymentMode: false,
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
                        <div className="checkout-items">
                            <div className="icon-wrapper">
                                {success.shipping ? <Success /> : <Shipping />}
                                <Typography type="p1" weight="semibold" text="Shipping" as="strong" color={'black'} />
                                {success.shipping && (
                                    <Typography
                                        type="caption"
                                        weight="semibold"
                                        text="Edit"
                                        as="small"
                                        color={colors.LightCeruleanBlue}
                                        onClick={() => {
                                            selectCurrentTarget(0);
                                            setSuccess(prev => ({ ...prev, shipping: false }));
                                        }}
                                    />
                                )}
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
                        <div className="checkout-items">
                            <div className="icon-wrapper">
                                {success.PaymentMode ? <Success /> : <PaymentCard />}
                                <Typography type="p1" weight="semibold" text="Payment Mode" as="strong" color={'black'} />
                            </div>
                            <PaymentMode isActive={currentTarget === 1} onSuccess={() => setSuccess(prev => ({ ...prev, PaymentMode: true }))} />
                        </div>
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
