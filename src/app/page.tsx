import './home.scss';

import { ProductCard } from '@components/ProductCard';
import { View } from '@components/View';
import { Product } from '@prisma/client';
import { Metadata } from 'next';
import { prismaInstance } from 'src/lib/prisma';

export const metadata: Metadata = {
    title: 'Trinature | Premier Organic Products Marketplace in Tamil Nadu',
    description:
        'Discover Trinature, the leading platform for premium organic products in Tamil Nadu. Our curated selection features the finest organic goods, from fresh produce to health supplements, all sourced sustainably to ensure the highest quality for our customers. Experience the best in organic living with Trinature.',
};

export default async function Home() {
    let products: Product[] = [];
    try {
        products = (await prismaInstance.product.findMany()).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } catch (error) {
        console.error('Error fetching products: ', error);
    }

    return (
        <View className="product-list index">
            {products.map((p, i) => (
                <ProductCard key={i} productName={p.productName} productDescription={p.productDescription || ''} productImage={p.productUrl || ''} productPrice={p.cost} productId={p.id} />
            ))}
        </View>
    );
}
