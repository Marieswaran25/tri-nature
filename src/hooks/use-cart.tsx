'use client';

import { useCallback, useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import { CartLineItem, Product } from '@prisma/client';
import axios from 'axios';
import { CartResponse } from 'src/app/api/cart/route';

import { useDebounce } from './use-debounce';

export interface UseCartReturn {
    cart: CartResponse | null;
    addToCart: ({ productId, quantity }: { productId: string; quantity: number }) => void;
    loading: boolean;
    isSuccess: boolean;
    cartLoading: boolean;
}

export const useCartInstance = (): UseCartReturn => {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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
            setLoading(true);
            const response: CartLineItem & { product: Product } = (await axios.patch('/api/cart/items', { productId, quantity })).data;
            setLoading(false);
            setIsSuccess(true);
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
        } finally {
            setTimeout(() => {
                setIsSuccess(false);
            }, 1000);
        }
    }, []);

    return {
        cart,
        addToCart,
        loading,
        isSuccess,
        cartLoading,
    };
};

export const useCart = singletonHook({ cart: null, addToCart: () => {}, loading: false, isSuccess: false, cartLoading: false }, useCartInstance);
