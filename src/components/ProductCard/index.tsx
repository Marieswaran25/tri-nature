'use client';
import './productCard.scss';
import colors from '@theme/colors.module.scss';

import React, { useState } from 'react';
import AddToCart from '@assets/images/addCart.svg';
import EmptyCart from '@assets/images/emptyCart.svg';
import { Button } from '@components/Button';
import { Counter } from '@components/Counter';
import Typography from '@components/Typography';
import { useCart } from '@hooks/use-cart';
import { useCounter } from '@hooks/use-counter';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ProductCardProps {
    productName: string;
    productDescription: string;
    productImage: StaticImageData | string;
    productPrice: number;
    productId: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ productName, productDescription, productImage, productPrice, productId }) => {
    const [initialCount, setInitialCount] = useState(0);
    const { count, increment, decrement, set } = useCounter(initialCount);
    const [showCounter, setShowCounter] = useState(false);
    const { addToCart } = useCart();

    const [loadingForThisProduct, setLoadingForThisProduct] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (count > 0 && initialCount !== count) {
                setLoadingForThisProduct(true);
                await addToCart({ productId: productId, quantity: count });
                setInitialCount(count);
                setLoadingForThisProduct(false);
                setIsSuccess(true);
            }
        } catch {
            setIsSuccess(false);
        } finally {
            setTimeout(() => setIsSuccess(false), 1000);
        }
    };

    return (
        <div className="product-container" onMouseEnter={() => setShowCounter(true)} onMouseLeave={() => setShowCounter(false)}>
            <div className="product-image-wrapper">
                <Image src={productImage} alt={productName} width={20} height={20} />
            </div>
            <div className="product-info">
                <div className="product-info-sub-wrapper">
                    <Typography type="p1" text={productName} weight="semibold" as="h5" color="black" />
                    <h6 className="product-price typography p1 semibold">
                        &#x20B9;{productPrice}
                        <span>/kg</span>
                    </h6>
                </div>
                <Typography type="p3" text={productDescription} weight="light" as="p" color="black" />
                <div className="button-wrapper">
                    <Button
                        label={<Typography type="p2" text={isSuccess ? 'Added to cart' : 'Add to cart'} weight="regular" as="p" color="white" />}
                        buttonType="primary"
                        backgroundColor={colors.SS5}
                        id="add-to-cart-btn"
                        type="button"
                        onClick={handleAddToCart}
                        isLoading={loadingForThisProduct}
                        loadingColor="white"
                        disabled={loadingForThisProduct}
                        rightIcon={isSuccess ? AddToCart : EmptyCart}
                        backgroundColorOnHover={colors.SS8}
                    />
                </div>
            </div>
            <Counter count={count} increment={() => increment()} decrement={() => decrement()} position="vertical" set={set} className={`product-counter ${showCounter ? 'visible' : ''}`} />
        </div>
    );
};
