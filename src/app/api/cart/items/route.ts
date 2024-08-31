import { CartLineItem, Product } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prismaInstance } from 'src/lib/prisma';

export type CartItems = CartLineItem & { product: Product };
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, quantity }: { productId: string; quantity: number } = { ...body };
        const cartId = request.cookies.get('cartId')?.value;
        if (!cartId) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
        }

        const existingCartItem: CartLineItem | null = await prismaInstance.cartLineItem.findFirst({
            where: {
                cartId,
                productId,
            },
        });

        let upsert;
        if (existingCartItem && quantity > 0) {
            upsert = await prismaInstance.cartLineItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity,
                },
                include: {
                    product: true,
                },
            });
        } else if (existingCartItem && quantity === 0) {
            upsert = await prismaInstance.cartLineItem.delete({
                where: {
                    id: existingCartItem.id,
                },
                include: {
                    product: true,
                },
            });
        } else {
            upsert = await prismaInstance.cartLineItem.create({
                data: {
                    quantity,
                    cartId,
                    productId,
                },
                include: {
                    product: true,
                },
            });
        }

        return NextResponse.json(upsert, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred while processing the request' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const cartId = request.cookies.get('cartId')?.value;
        if (!cartId) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
        }

        const cart: CartItems[] = await prismaInstance.cartLineItem.findMany({
            where: {
                cartId,
            },
            include: {
                product: true,
            },
        });

        return NextResponse.json(cart, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred while processing the request' }, { status: 500 });
    }
}
