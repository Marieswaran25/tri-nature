'use client';
import './orderSummary.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import Lock from '@assets/images/lock.svg';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { useCart } from '@hooks/use-cart';

export const OrderSummary = () => {
    const { summary, cart } = useCart();
    return (
        <div className="order-summary">
            <Typography type="p1" weight="semibold" text="Order Summary" as="strong" />
            <hr />
            <div className="details">
                <Typography type={'p3'} text={'Sub-total'} as="p" color="black" weight={'light'} />
                <Typography type={'p3'} text={`${summary?.total}`} as="p" color="black" weight={'regular'} />
            </div>
            {summary?.total !== 0 && (
                <div className="details">
                    <Typography type={'p3'} text={'Shipping'} as="p" color="black" weight={'light'} />
                    <Typography type={'p3'} text={`${summary?.total >= 999 ? 'FREE' : '₹40'}`} as="p" color={summary?.total >= 999 ? colors.LightCeruleanBlue : 'black'} weight={'regular'} />
                </div>
            )}
            <div className="details">
                <Typography type={'p3'} text={'Arrives in'} as="p" color="black" weight={'light'} />
                <Typography type={'p3'} text={`4-5 business days`} as="p" color="black" weight={'regular'} />
            </div>
            <div className="details">
                <Typography type={'p2'} text={'Total'} as="p" color="black" weight={'semibold'} />
                <Typography type={'p2'} text={summary?.total === 0 ? '₹0' : `₹${summary?.total + (summary?.total >= 999 ? 0 : 40)}`} as="p" color="black" weight={'semibold'} />
            </div>
            <Button
                label={<Typography type="p2" text={'Place your order'} weight="semibold" as="p" color="white" />}
                buttonType="primary"
                backgroundColor={colors.LightCeruleanBlue}
                id="pace-your-order-btn"
                type="button"
                loadingColor="white"
                rightIcon={Lock}
                backgroundColorOnHover={colors.C9}
                disable={summary.total <= 0}
            />
        </div>
    );
};
