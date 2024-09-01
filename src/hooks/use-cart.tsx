'use client';

import { useCallback, useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import { CartLineItem, Product } from '@prisma/client';
import axios from 'axios';
import { CartResponse } from 'src/app/api/cart/route';

export interface UseCartReturn {
    cart: CartResponse | null;
    addToCart: ({ productId, quantity }: { productId: string; quantity: number }) => Promise<void>;
    cartLoading: boolean;
}

export const useCartInstance = (): UseCartReturn => {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [cartLoading, setCartLoading] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            try {
                const cartResponse: { cart: CartResponse; message: string } = (await axios.get('/api/cart')).data;
                setCart(cartResponse.cart);
                setCartLoading(false);
            } catch {
                setCart(null);
            }
        };
        getCart();
    }, []);

    const addToCart = useCallback(async ({ productId, quantity }: { productId: string; quantity: number }) => {
        try {
            const response: CartLineItem & { product: Product } = (await axios.patch('/api/cart/items', { productId, quantity })).data;
            setCart(prev => {
                if (prev) {
                    const itemExists = prev.cartLineItems.some(item => item.id === response.id);
                    if (itemExists && quantity > 0) {
                        return { ...prev, cartLineItems: prev.cartLineItems.map(item => (item.id === response.id ? response : item)) };
                    } else if (itemExists && quantity === 0) {
                        console.log('Item removed from cart');
                        return {
                            ...prev,
                            cartLineItems: prev.cartLineItems.filter(item => item.id !== response.id),
                        };
                    } else {
                        return { ...prev, cartLineItems: [...prev.cartLineItems, response] };
                    }
                } else {
                    return null;
                }
            });
        } catch (error) {
            setCart(null);
        }
    }, []);

    return {
        cart,
        addToCart,
        cartLoading,
    };
};

export const useCart = singletonHook({ cart: null, addToCart: async () => {}, cartLoading: false }, useCartInstance);
