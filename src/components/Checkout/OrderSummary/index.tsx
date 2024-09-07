import './orderSummary.scss';

import React from 'react';
import Typography from '@components/Typography';

export const OrderSummary = () => {
    return (
        <div className="order-summary">
            <Typography type="p1" weight="semibold" text="Order Summary" as="strong" />
        </div>
    );
};
