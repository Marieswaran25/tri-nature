'use client';
import './productCard.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import Tick from '@assets/images/tick.svg';
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
    const { count, increment, decrement, set } = useCounter(0);
    const [showCounter, setShowCounter] = React.useState(false);
    const { addToCart, loading, isSuccess } = useCart();

    const handleAddToCart = () => {
        addToCart({ productId: productId, quantity: count });
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
                        label={<Typography type="p2" weight="semibold" text={'View Product'} color="white" />}
                        buttonType="primary"
                        backgroundColor={colors.LightCeruleanBlue}
                        id="view-product-btn"
                        type="button"
                        backgroundColorOnHover={colors.C9}
                    />{' '}
                    <Button
                        label={<Typography type="p2" weight="semibold" text={isSuccess ? 'Added to Cart' : 'Add to Cart'} color="white" />}
                        buttonType="primary"
                        backgroundColor={colors.SS5}
                        id="add-to-cart-btn"
                        type="button"
                        onClick={handleAddToCart}
                        isLoading={loading}
                        loadingColor="white"
                        disabled={loading}
                        leftIcon={isSuccess ? Tick : undefined}
                        backgroundColorOnHover={colors.SS8}
                    />
                </div>
            </div>
            <Counter count={count} increment={() => increment()} decrement={() => decrement()} position="vertical" set={set} className={`product-counter ${showCounter ? 'visible' : ''}`} />
        </div>
    );
};
