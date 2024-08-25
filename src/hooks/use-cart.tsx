'use client';

import { useCallback, useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import { CartLineItem, Product } from '@prisma/client';
import axios from 'axios';

export interface UseCartReturn {
    cartId: string | undefined;
    cartItems: Array<CartLineItem & { product: Product }>;
    addToCart: ({ productId, quantity }: { productId: string; quantity: number }) => void;
    loading: boolean;
    isSuccess: boolean;
}

export const useCartInstance = (): UseCartReturn => {
    const [cartId, setCartId] = useState<string | undefined>(undefined);
    const [cartItems, setCartItems] = useState<Array<CartLineItem & { product: Product }>>([]);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const getCart = async () => {
            try {
                const response: { cartId: string; message: string } = (await axios.get('/api/cart')).data;
                setCartId(response.cartId);
            } catch {
                setCartId(undefined);
            }
        };

        getCart();
    }, []);

    useEffect(() => {
        const getCartItems = async () => {
            if (cartId) {
                try {
                    const response: Array<CartLineItem & { product: Product }> = (await axios.get(`/api/cart/items`)).data;
                    setCartItems(response);
                } catch (error) {
                    setCartItems([]);
                }
            }
        };
        getCartItems();
    }, [cartId, setCartItems]);

    const addToCart = useCallback(async ({ productId, quantity }: { productId: string; quantity: number }) => {
        try {
            setLoading(true);
            const response: CartLineItem & { product: Product } = (await axios.post('/api/cart/items', { productId, quantity })).data;
            setLoading(false);
            setIsSuccess(true);
            setCartItems(prev => {
                const itemExists = prev.some(item => item.id === response.id);

                if (itemExists) {
                    return prev.map(item => (item.id === response.id ? { ...item, ...response } : item));
                } else {
                    return [...prev, response];
                }
            });
        } catch (error) {
            setCartItems(prev => [...prev]);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setIsSuccess(false);
            }, 1000);
        }
    }, []);

    return {
        cartId,
        cartItems,
        addToCart,
        loading,
        isSuccess,
    };
};

export const useCart = singletonHook({ cartId: undefined, cartItems: [], addToCart: () => {}, loading: false, isSuccess: false }, useCartInstance);
