import './productCard.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ProductCardProps {
    productName: string;
    productDescription: string;
    productImage: StaticImageData;
    productPrice: number;
}
export const ProductCard: React.FC<ProductCardProps> = ({ productName, productDescription, productImage, productPrice }) => {
    return (
        <div className="product-container">
            <div className="product-image-wrapper">
                <Image src={productImage} alt={productName} />
            </div>
            <div className="product-info">
                <div className="product-info-sub-wrapper">
                    <Typography type="p1" text={productName} weight="semibold" as="h5" color="white" />
                    <Typography type="p2" text={`$${productPrice}`} weight="semibold" as="h6" color="white" />
                </div>
                <Typography type="p3" text={productDescription} weight="light" as="p" color="white" />
                <Button
                    label={<Typography type="p2" weight="semibold" text={'View Product'} color="white" />}
                    buttonType="primary"
                    backgroundColor={colors.LightCeruleanBlue}
                    id="view-product-btn"
                    type="button"
                />{' '}
                <Button label={<Typography type="p2" weight="semibold" text={'Add to Cart'} color="white" />} buttonType="primary" backgroundColor={colors.SS5} id="add-to-cart-btn" type="button" />
            </div>
        </div>
    );
};
