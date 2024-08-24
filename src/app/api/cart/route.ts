import { NextRequest, NextResponse } from 'next/server';
import { CART_EXPIRATION_TIME } from 'src/config';
import { prismaInstance } from 'src/lib/prisma';

export async function GET(req: NextRequest) {
    const cartId = req.cookies.get('cartId')?.value;

    if (!cartId) {
        try {
            const cart = await prismaInstance.cart.create({
                data: {
                    expiresAt: new Date(Date.now() + CART_EXPIRATION_TIME),
                },
            });

            console.log('New cart created:', cart.id);

            const res = NextResponse.json({ message: 'Cart created', cartId: cart.id });
            res.cookies.set('cartId', cart.id, {
                path: '/',
                expires: new Date(Date.now() + CART_EXPIRATION_TIME),
            });
        } catch (error) {
            console.error('Error creating cart:', error);
            return NextResponse.json({ message: 'Could not create cart' }, { status: 500 });
        }
    } else {
        console.log('Existing cart found:', cartId);
        return NextResponse.json({ message: 'Cart already exists', cartId });
    }
}
