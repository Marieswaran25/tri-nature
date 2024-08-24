import { NextRequest, NextResponse } from 'next/server';
import { prismaInstance } from 'src/lib/prisma';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { productId, quantity }: { productId: string; quantity: number } = { ...body };
    const cartId = request.cookies.get('cartId')?.value;
    if (!cartId) {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    const cart = await prismaInstance.cartLineItem.create({
        data: {
            cartId,
            productId,
            quantity,
        },
    });

    return NextResponse.json(cart, { status: 201 });
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
    });

    return NextResponse.json(cart, { status: 200 });
}
