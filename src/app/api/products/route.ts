import { NextRequest, NextResponse } from 'next/server';
import { prismaInstance } from 'src/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const products = await prismaInstance.product.findMany();
        const sortedProducts = products.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return NextResponse.json(sortedProducts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while fetching products' }, { status: 500 });
    }
}
