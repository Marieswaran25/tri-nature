import './bestSellers.scss';
import colors from '@theme/colors.module.scss';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { useProducts } from '@hooks/use-products';
import Image from 'next/image';

export const BestSellers = () => {
    const { bestProductsNotIncludedInCart, addToCart } = useProducts();
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

    const handleAddToCart = async (prodId: string) => {
        try {
            if (bestProductsNotIncludedInCart) {
                setLoadingStates(prev => ({ ...prev, [prodId]: true }));
                await addToCart({ productId: prodId, quantity: 1 });
                setLoadingStates(prev => ({ ...prev, [prodId]: false }));
            }
        } catch {
            setLoadingStates(prev => ({ ...prev, [prodId]: false }));
        }
    };

    return (
        <div className="our-best-sellers">
            {Array.isArray(bestProductsNotIncludedInCart) && bestProductsNotIncludedInCart.length > 0 && <Typography type={'p1'} weight={'semibold'} text={'Our Best Sellers'} as="p" color="black" />}
            {Array.isArray(bestProductsNotIncludedInCart) &&
                bestProductsNotIncludedInCart.length > 0 &&
                bestProductsNotIncludedInCart.map(product => (
                    <div className="best-product-scope" key={product.id}>
                        <div className="product-image-wrapper">
                            <Image src={product.productUrl || ''} alt={product.productName} width={100} height={100} />
                        </div>
                        <div className="product-info">
                            <Typography type={'p2'} weight={'semibold'} text={product.productName} as="strong" />
                            {product.productDescription && <Typography type={'caption'} weight={'light'} text={product.productDescription} as="p" color="gray" />}
                            <div className="sub-wrapper">
                                <h6 className="product-price typography p2 semibold">
                                    &#x20B9;{product.cost}
                                    <span>/{product.scale || 'Kg'}</span>
                                </h6>
                                <Button
                                    label={<Typography type="p2" text={'Add'} weight="regular" as="p" color="white" />}
                                    buttonType="primary"
                                    backgroundColor={colors.LightCeruleanBlue}
                                    id="add-to-cart-btn"
                                    type="button"
                                    onClick={() => handleAddToCart(product.id)}
                                    isLoading={loadingStates[product.id] || false}
                                    loadingColor="white"
                                    disabled={loadingStates[product.id] || false}
                                    backgroundColorOnHover={colors.C9}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
