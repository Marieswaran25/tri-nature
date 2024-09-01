'use client';
import './cart.scss';

import React from 'react';
import Typography from '@components/Typography';
import { View } from '@components/View';
import { useCart } from '@hooks/use-cart';
import { useProducts } from '@hooks/use-products';

import { CartItemFallback } from './CartItems/fallback';
import { BestSellers } from './BestSellers';
import { CartItem } from './CartItems';
import { Summary } from './Summary';

export const Cart: React.FC = () => {
    const { cart, cartLoading } = useCart();
    const { products, loading } = useProducts();
    return (
        <View className="cart">
            <div className="cart-scope">
                {Array.isArray(cart?.cartLineItems) && cart?.cartLineItems.length === 0 && !cartLoading && (
                    <Typography type={'p1'} weight={'semibold'} text={'Your Cart is empty'} as="p" color="black" />
                )}

                {Array.isArray(cart?.cartLineItems) && cart.cartLineItems.length > 0 && (
                    <Typography type={'p1'} weight={'semibold'} text={`Your Cart (${cart.cartLineItems.length})`} as="p" color="black" />
                )}
                <div className="current-cart-items">
                    {Array.isArray(cart?.cartLineItems) && cart.cartLineItems.length > 0 && cart.cartLineItems.map(item => <CartItem key={item.id} data={item} />)}
                    {(!Array.isArray(cart?.cartLineItems) || cartLoading) && Array.from({ length: 4 }).map((_, index) => <CartItemFallback key={index} />)}
                    {Array.isArray(products) && products.length > 0 && cart && !loading && <BestSellers />}
                </div>
            </div>

            <div className="summary-scope">
                <Summary isLoading={cartLoading || loading || !Array.isArray(cart?.cartLineItems)} />
            </div>
        </View>
    );
};
