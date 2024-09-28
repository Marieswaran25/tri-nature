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
import { Address } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { ROUTES } from 'src/routes';

import { Billing } from './Billing';
import { OrderSummary } from './OrderSummary';
import { PaymentMode } from './PaymentMode';

export const Checkout = ({ user, signIn }: { user?: User; signIn: () => Promise<void> }) => {
    const { cartLoading, cart } = useCart();
    const [currentTarget, , , selectCurrentTarget] = useCustomSelect(0);
    const [address, setAddress] = useState<Partial<Address>>({});
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

    const concatAddress = React.useMemo(() => {
        if (address) {
            const { addressLine1, addressLine2, city, district, state, pinCode, mobile } = { ...address };
            return `Address: ${addressLine1}, ${addressLine2 || ''}, ${city}, ${district}, ${state || 'Tamil Nadu'}, ${pinCode}. Mobile: ${mobile}`;
        }
        return '';
    }, [address]);
    return (
        <section className="checkout">
            {!cartLoading && cart ? (
                <div className="checkout-info">
                    <div className="checkout-form-wrapper">
                        <div className="checkout-items">
                            <div className="checkout-items-wrapper">
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
                                    handleSuccess={(data: Partial<Address>) => {
                                        selectCurrentTarget(1);
                                        setTimeout(() => {
                                            setAddress(data);
                                            setSuccess(prev => ({ ...prev, shipping: true }));
                                        }, 500);
                                    }}
                                />
                                <div className="content">{concatAddress && success.shipping && <Typography type="p3" weight="light" text={concatAddress} as="span" color={'gray'} />}</div>
                            </div>
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
                        <OrderSummary isReady={success.shipping && success.PaymentMode} user={user} signIn={signIn} />
                    </div>
                </div>
            ) : (
                <Loader style={{ border: `8px solid ${colors.LightCeruleanBlue}` }} outline="transparent" borderTopColor={colors.LightCeruleanBlue} />
            )}
        </section>
    );
};
