import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}
function prismaClientSingleton() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
        }
        return global.prisma;
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
        }
        return global.prisma;
    }
}

export const prismaInstance = prismaClientSingleton();
