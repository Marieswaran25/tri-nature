'use client';
import './cart.scss';

import React from 'react';
import Typography from '@components/Typography';
import { View } from '@components/View';
import { useCart } from '@hooks/use-cart';

import { CartItemFallback } from './CartItems/fallback';
import { CartItem } from './CartItems';

export const Cart: React.FC = () => {
    const { cart, cartLoading } = useCart();
    return (
        <View className="cart">
            {Array.isArray(cart?.cartLineItems) && cart?.cartLineItems.length === 0 && <Typography type={'p1'} weight={'semibold'} text={'Your Cart is empty'} as="p" color="black" />}
            {Array.isArray(cart?.cartLineItems) && cart?.cartLineItems.length > 0 && (
                <div className="cart-scope">
                    {Array.isArray(cart?.cartLineItems) && cart.cartLineItems.length > 0 && (
                        <Typography type={'p1'} weight={'semibold'} text={`Your Cart (${cart.cartLineItems.length})`} as="p" color="black" />
                    )}
                    <div className="current-cart-items">
                        {cart.cartLineItems.map(item => (
                            <CartItem key={item.id} data={item} />
                        ))}
                        {(!Array.isArray(cart?.cartLineItems) || cartLoading) && Array.from({ length: 3 }).map((_, index) => <CartItemFallback key={index} />)}
                    </div>
                </div>
            )}
            <div className="summary-scope"></div>
        </View>
    );
};
