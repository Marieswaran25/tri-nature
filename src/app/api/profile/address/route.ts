import { Address } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prismaInstance } from 'src/lib/prisma';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { address }: { address: Omit<Address, 'userId'> } = { ...body };
    const userId = request.cookies.get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await prismaInstance.address.create({
        data: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            pinCode: address.pinCode,
            mobile: address.mobile,
            district: address.district,
            userId: userId,
        },
    });

    return NextResponse.json({ message: 'Address added successfully' }, { status: 201 });
}

export async function GET(request: NextRequest) {
    const userId = request.cookies.get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const addresses = await prismaInstance.address.findMany({
        where: {
            userId,
        },
    });

    return NextResponse.json(addresses, { status: 200 });
}
