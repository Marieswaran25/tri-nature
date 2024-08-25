import { NextRequest, NextResponse } from 'next/server';
import { prismaInstance } from 'src/lib/prisma';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { productId, quantity }: { productId: string; quantity: number } = { ...body };
    const cartId = request.cookies.get('cartId')?.value;
    if (!cartId) {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const existingCartItem = await prismaInstance.cartLineItem.findFirst({
        where: {
            cartId,
            productId,
        },
    });
    if (!existingCartItem) {
        const cart = await prismaInstance.cartLineItem.create({
            data: {
                quantity,
                cartId,
                productId,
            },
            include: {
                product: true,
            },
        });
        return NextResponse.json(cart, { status: 201 });
    } else {
        const cart = await prismaInstance.cartLineItem.update({
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
        return NextResponse.json(cart, { status: 201 });
    }
}

export async function GET(request: NextRequest) {
    const cartId = request.cookies.get('cartId')?.value;
    if (!cartId) {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cart = await prismaInstance.cartLineItem.findMany({
        where: {
            cartId,
        },
        include: {
            product: true,
        },
    });

    return NextResponse.json(cart, { status: 200 });
}
