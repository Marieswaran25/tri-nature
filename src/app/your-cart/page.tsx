import { Cart } from '@components/Cart';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { prismaInstance } from 'src/lib/prisma';

export const dynamic = 'force-dynamic';
export async function generateMetadata(): Promise<Metadata> {
    const cart = await prismaInstance.cartLineItem.findMany({
        where: {
            cartId: cookies().get('cartId')?.value,
        },
    });
    return {
        title: cart?.length === 0 ? `Your Cart` : `Your Cart (${cart.length})`,
    };
}

export default async function YourCart() {
    return (
        <div className="your-cart-page" style={{ marginTop: '90px' }}>
            <Cart />
        </div>
    );
}
