import './cartItem.scss';

import React from 'react';
import { FallbackLine } from '@components/FallbackLine';

export const CartItemFallback = () => {
    return (
        <div className="cart-item-fallback">
            <div className="product-image-wrapper">
                <FallbackLine containerStyle={{}} lineStyle={{ width: '100px', height: '100px', borderRadius: '50%' }} className="loader" />
            </div>
            <div className="product-info">
                <FallbackLine containerStyle={{}} lineStyle={{ width: '40%', height: '20px' }} className="loader" />
                <FallbackLine containerStyle={{}} lineStyle={{ width: '100%', height: '16px' }} className="loader" />
                <FallbackLine containerStyle={{}} lineStyle={{ width: '100%', height: '16px' }} className="loader" />
                <FallbackLine containerStyle={{}} lineStyle={{ width: '25%', height: '20px' }} className="loader" />
            </div>
        </div>
    );
};
