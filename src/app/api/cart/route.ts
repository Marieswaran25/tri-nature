import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';
import { CART_EXPIRATION_TIME } from 'src/config';
import { prismaInstance } from 'src/lib/prisma';

export async function GET(req: NextRequest) {
    const cartId = req.cookies.get('cartId')?.value;

    try {
        if (!cartId) {
            const newCart = await prismaInstance.cart.create({
                data: {
                    expiresAt: new Date(Date.now() + CART_EXPIRATION_TIME),
                },
            });

            console.log('New cart created:', newCart.id);

            const res = NextResponse.json({ message: 'Cart created', cartId: newCart.id });
            res.cookies.set('cartId', newCart.id, {
                path: '/',
                expires: new Date(Date.now() + CART_EXPIRATION_TIME),
            });
            return res;
        } else {
            const existingCart = await prismaInstance.cart.findUnique({
                where: { id: cartId, isActive: true },
            });

            if (existingCart && existingCart.expiresAt >= new Date()) {
                console.log('Valid existing cart found:', cartId);
                return NextResponse.json({ message: 'Cart already exists', cartId });
            } else {
                console.log('Cart expired or inactive:', cartId);
                const newCart = await prismaInstance.cart.create({
                    data: {
                        expiresAt: new Date(Date.now() + CART_EXPIRATION_TIME),
                    },
                });

                const res = NextResponse.json({ message: 'New cart created', cartId: newCart.id });
                req.cookies.delete('cartId');
                res.cookies.set('cartId', newCart.id, {
                    path: '/',
                    expires: new Date(Date.now() + CART_EXPIRATION_TIME),
                });
                return res;
            }
        }
    } catch (error) {
        console.error('Error handling cart:', error);
        return NextResponse.json({ message: 'An error occurred while processing the cart' }, { status: 500 });
    }
}
