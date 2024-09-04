import './summary.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import { Button } from '@components/Button';
import { FallbackLine } from '@components/FallbackLine';
import Typography from '@components/Typography';
import { useCart } from '@hooks/use-cart';
export const Summary = ({ isLoading }: { isLoading: boolean }) => {
    const { summary } = useCart();
    return (
        <div className="summary">
            <Typography type={'p1'} text={'Summary'} as="p" color="black" weight={'semibold'} />
            <Typography type={'p3'} text={'We are offering free cash on delivery on products above ₹999'} as="p" color="gray" weight={'light'} />
            <hr />
            {isLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                    <div className="details-fallback" key={index}>
                        <FallbackLine containerStyle={{ width: '30%' }} lineStyle={{ width: '100%', height: '18px' }} className="summary-loader" />
                        <FallbackLine containerStyle={{ width: '30%' }} lineStyle={{ width: '100%', height: '18px' }} className="summary-loader" />
                    </div>
                ))}
            {!isLoading && (
                <>
                    {Object.entries(summary?.items).map(([key, value]) => (
                        <div className="details" key={key}>
                            <Typography type={'p3'} text={key} as="p" color="black" weight={'light'} />
                            <Typography type={'p3'} text={`${value}`} as="p" color="black" weight={'regular'} />
                        </div>
                    ))}
                    <div className="details">
                        <Typography type={'p3'} text={'Sub-total'} as="p" color="black" weight={'light'} />
                        <Typography type={'p3'} text={`${summary?.total}`} as="p" color="black" weight={'regular'} />
                    </div>
                    {summary?.total !== 0 && (
                        <div className="details">
                            <Typography type={'p3'} text={'Shipping'} as="p" color="black" weight={'light'} />
                            <Typography type={'p3'} text={`${summary?.total >= 999 ? 'FREE' : '₹40'}`} as="p" color="black" weight={'regular'} />
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
                </>
            )}
            <Button
                label={<Typography type="p2" text={'Proceed to Checkout'} weight="semibold" as="p" color="white" />}
                buttonType="primary"
                backgroundColor={colors.LightCeruleanBlue}
                id="add-to-cart-btn"
                type="button"
                loadingColor="white"
                backgroundColorOnHover={colors.C9}
                disable={summary.total <= 0 || isLoading}
            />
        </div>
    );
};
