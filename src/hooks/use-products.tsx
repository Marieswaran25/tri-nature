'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';
import { Product } from '@prisma/client';
import axios from 'axios';

import { useCart } from './use-cart';

export interface useProductReturn {
    products: Product[] | null;
    loading: boolean;
    setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
    bestProductsNotIncludedInCart: Product[];
    addToCart: ({ productId, quantity }: { productId: string; quantity: number }) => Promise<void>;
}

const useProductInstance = (): useProductReturn => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const { cart, addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    const getProducts = useCallback(async () => {
        try {
            setLoading(true);
            const products: Product[] = (await axios.get('/api/products')).data;
            setProducts(products);
            setLoading(false);
        } catch {
            setProducts(null);
        }
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const bestProductsNotIncludedInCart: Product[] = useMemo(() => {
        if (!cart || (Array.isArray(cart.cartLineItems) && cart.cartLineItems.length === 0)) {
            return products || [];
        } else {
            if (Array.isArray(products) && products.length > 0) {
                return products?.filter(product => !cart.cartLineItems.some(item => item.productId === product.id));
            } else {
                return [];
            }
        }
    }, [cart, products]);

    return { products, loading, setProducts, bestProductsNotIncludedInCart, addToCart };
};

export const useProducts = singletonHook({ products: null, loading: false, setProducts: () => {}, bestProductsNotIncludedInCart: [], addToCart: async () => {} }, useProductInstance);
