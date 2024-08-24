'use client';

import { useCallback, useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import { CartLineItem } from '@prisma/client';
import axios from 'axios';

export interface UseCartReturn {
    cartId: string | undefined;
    cartItems: CartLineItem[];
    addToCart: ({ productId, quantity }: { productId: string; quantity: number }) => void;
}

export const useCartInstance = (): UseCartReturn => {
    const [cartId, setCartId] = useState<string | undefined>(undefined);
    const [cartItems, setCartItems] = useState<CartLineItem[]>([]);

    useEffect(() => {
        const getCart = async () => {
            const response: { cartId: string; message: string } = (await axios.get('/api/cart')).data;
            setCartId(response.cartId);
        };

        getCart();
    }, []);

    useEffect(() => {
        const getCartItems = async () => {
            if (cartId) {
                const response: CartLineItem[] = (await axios.get(`/api/cart/items`)).data;
                setCartItems(response);
            }
        };
        getCartItems();
    }, [cartId, setCartItems]);

    const addToCart = useCallback(async ({ productId, quantity }: { productId: string; quantity: number }) => {
        const response: CartLineItem = (await axios.post('/api/cart/items', { productId, quantity })).data;
        setCartItems(prev => [...prev, response]);
    }, []);

    return {
        cartId,
        cartItems,
        addToCart,
    };
};

export const useCart = singletonHook({ cartId: undefined, cartItems: [], addToCart: () => {} }, useCartInstance);
