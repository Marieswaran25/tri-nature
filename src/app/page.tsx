'use server';

import './home.scss';

import { NavBar } from '@components/Navbar';
import { ProductCard } from '@components/ProductCard';
import { View } from '@components/View';
import { Product } from '@prisma/client';
import { prismaInstance } from 'src/lib/prisma';

export default async function Home() {
    let products: Product[] = [];
    try {
        products = await prismaInstance.product.findMany();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <>
            <NavBar />
            <View className="product-list">
                {products.map((p, i) => (
                    <ProductCard key={i} productName={p.productName} productDescription={p.productDescription || ''} productImage={p.productUrl || ''} productPrice={p.cost} productId={p.id} />
                ))}
            </View>
        </>
    );
}
