'use client';
import './cart.scss';

import React from 'react';
import Typography from '@components/Typography';
import { View } from '@components/View';
import { useCart } from '@hooks/use-cart';

import { CartItem } from './CartItems';

export const Cart: React.FC = () => {
    const { cartItems } = useCart();
    return (
        <View className="cart">
            {Array.isArray(cartItems) && cartItems.length === 0 && <Typography type={'p1'} weight={'semibold'} text={'Your Cart is empty'} as="p" color="black" />}
            {Array.isArray(cartItems) && cartItems.length > 0 && (
                <div className="cart-scope">
                    {Array.isArray(cartItems) && cartItems.length > 0 && <Typography type={'p1'} weight={'semibold'} text={`Your Cart (${cartItems.length})`} as="p" color="black" />}
                    <div className="current-cart-items">
                        {cartItems.map(item => (
                            <CartItem key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            )}
            <div className="summary-scope"></div>
        </View>
    );
};
