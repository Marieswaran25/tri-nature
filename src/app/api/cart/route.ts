import { Cart, CartLineItem, Product } from '@prisma/client';
import moment from 'moment';
import { NextRequest, NextResponse } from 'next/server';
import { CART_EXPIRATION_TIME } from 'src/config';
import { prismaInstance } from 'src/lib/prisma';

export type CartResponse = Cart & { cartLineItems: (CartLineItem & { product: Product })[] };
export async function GET(req: NextRequest) {
    const cartId = req.cookies.get('cartId')?.value;

    try {
        if (!cartId) {
            const newCart: CartResponse = await prismaInstance.cart.create({
                data: {
                    expiresAt: new Date(Date.now() + CART_EXPIRATION_TIME),
                },
                include: {
                    cartLineItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            console.log('New cart created:', newCart.id);

            const res = NextResponse.json({ message: 'Cart created', cart: newCart });
            res.cookies.set('cartId', newCart.id, {
                path: '/',
                expires: new Date(Date.now() + CART_EXPIRATION_TIME),
            });
            return res;
        } else {
            const existingCart: CartResponse | null = await prismaInstance.cart.findUnique({
                where: { id: cartId, isActive: true },
                include: {
                    cartLineItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if (existingCart && existingCart.expiresAt >= new Date()) {
                console.log('Valid existing cart found:', cartId);
                return NextResponse.json({ message: 'Cart already exists', cart: existingCart });
            } else {
                console.log('Cart expired or inactive:', cartId);
                const newCart: CartResponse = await prismaInstance.cart.create({
                    data: {
                        expiresAt: new Date(Date.now() + CART_EXPIRATION_TIME),
                    },
                    include: {
                        cartLineItems: {
                            include: {
                                product: true,
                            },
                        },
                    },
                });

                const res = NextResponse.json({ message: 'New cart created', cart: newCart });
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
