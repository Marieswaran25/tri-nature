'use client';
import './cartItem.scss';

import React from 'react';
import { Counter } from '@components/Counter';
import Typography from '@components/Typography';
import { useCounter } from '@hooks/use-counter';
import Image from 'next/image';
import { CartItems } from 'src/app/api/cart/items/route';

export const CartItem: React.FC<{ data: CartItems }> = ({ data }) => {
    const counter = useCounter(data?.quantity || 1);
    return (
        <div className="cart-item">
            <div className="product-image-wrapper">
                <Image src={data.product.productUrl || ''} alt={data.product.productName} width={100} height={100} />
            </div>
            <div className="product-info">
                <Typography type={'p2'} weight={'semibold'} text={data.product.productName} as="strong" />
                {data.product.productDescription && <Typography type={'p3'} weight={'light'} text={data.product.productDescription} as="p" color="gray" />}
                <div className="sub-wrapper">
                    <h6 className="product-price typography p2 semibold">
                        &#x20B9;{data.product.cost}
                        <span>/kg</span>
                    </h6>{' '}
                    <Counter {...counter} position={'horizontal'} className="cart-counter" />
                </div>
            </div>
        </div>
    );
};
